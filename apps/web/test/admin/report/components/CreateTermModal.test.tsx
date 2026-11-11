import { Suspense } from 'react';

import userEvent from '@testing-library/user-event';
import { Toaster } from 'react-hot-toast';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiError, fetcher } from '@/_api/fetcher';
import { Term } from '@/_api/types/report';
import { CreateTermModal } from '@/admin/report/admin/_components/CreateTermModal';
import { ReportClientPage } from '@/admin/report/admin/_pages/ReportClientPage';

import { render, screen, waitFor } from '../../../utils/render';

const pickStartDate = async (
  user: ReturnType<typeof userEvent.setup>,
  label: string,
) => {
  await user.click(screen.getByRole('button', { name: '회차 시작일 선택' }));
  await user.click(screen.getByRole('gridcell', { name: label }));
};

const setCount = async (
  user: ReturnType<typeof userEvent.setup>,
  value: string,
) => {
  const input = screen.getByLabelText(/회차 수/);
  await user.clear(input);
  if (value) await user.type(input, value);
};

beforeEach(() => {
  // userEvent의 타이머는 그대로 두고 Date만 고정 (캘린더가 오늘이 속한 달로 열림)
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(2026, 6, 1));
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('CreateTermModal', () => {
  it('시작일과 회차 수를 입력하면 마감일 미리보기를 보여준다', async () => {
    const user = userEvent.setup();
    render(<CreateTermModal isOpen closeModal={vi.fn()} />);

    await pickStartDate(user, '2026년 7월 1일');
    await setCount(user, '2');

    expect(
      screen.getByText(/2회차 · 2026-07-01 ~ 2026-07-28/),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('회차 기간이 해를 넘겨 생성할 수 없어요.'),
    ).not.toBeInTheDocument();
  });

  it('회차 기간이 해를 넘기면 제출 전에 경고한다', async () => {
    vi.setSystemTime(new Date(2026, 11, 1));
    const user = userEvent.setup();
    render(<CreateTermModal isOpen closeModal={vi.fn()} />);

    await pickStartDate(user, '2026년 12월 1일');
    await setCount(user, '3');

    expect(
      screen.getByText(/3회차 · 2026-12-01 ~ 2027-01-11/),
    ).toBeInTheDocument();
    expect(
      screen.getByText('회차 기간이 해를 넘겨 생성할 수 없어요.'),
    ).toBeInTheDocument();
  });

  it('시작일이 없으면 생성할 수 없다', () => {
    render(<CreateTermModal isOpen closeModal={vi.fn()} />);

    expect(screen.getByRole('button', { name: '생성하기' })).toBeDisabled();
  });

  it('회차 수가 0이면 생성할 수 없다', async () => {
    const user = userEvent.setup();
    render(<CreateTermModal isOpen closeModal={vi.fn()} />);

    await pickStartDate(user, '2026년 7월 1일');
    await setCount(user, '0');

    expect(screen.getByRole('button', { name: '생성하기' })).toBeDisabled();
  });

  it('생성하면 시작일과 회차 수를 보내고 모달을 닫는다', async () => {
    const post = vi
      .spyOn(fetcher, 'postWithoutResponse')
      .mockResolvedValue(undefined);
    const closeModal = vi.fn();
    const user = userEvent.setup();
    render(<CreateTermModal isOpen closeModal={closeModal} />);

    await pickStartDate(user, '2026년 7월 1일');
    await setCount(user, '2');
    await user.click(screen.getByRole('button', { name: '생성하기' }));

    await waitFor(() => expect(closeModal).toHaveBeenCalledTimes(1));
    expect(post).toHaveBeenCalledWith('admin/activity-reports/term', {
      json: { startDate: '2026-07-01', totalTermCount: 2 },
    });
  });

  it('서버가 400을 주면 서버 메시지를 toast로 보여주고 모달은 열어둔다', async () => {
    vi.spyOn(fetcher, 'postWithoutResponse').mockRejectedValue(
      new ApiError(400, '기존 회차와 기간이 겹칩니다.', '2026-07-01T00:00:00'),
    );
    const closeModal = vi.fn();
    const user = userEvent.setup();
    render(
      <>
        <Toaster />
        <CreateTermModal isOpen closeModal={closeModal} />
      </>,
    );

    await pickStartDate(user, '2026년 7월 1일');
    await user.click(screen.getByRole('button', { name: '생성하기' }));

    expect(
      await screen.findByText('기존 회차와 기간이 겹칩니다.'),
    ).toBeInTheDocument();
    expect(closeModal).not.toHaveBeenCalled();
  });

  it('생성에 성공하면 회차 목록에 새 회차가 나타난다', async () => {
    const existing: Term = {
      term: 1,
      startDate: '2026-03-02',
      endDate: '2026-03-15',
      status: 'CLOSED',
    };
    const created: Term = {
      term: 2,
      startDate: '2026-07-01',
      endDate: '2026-07-14',
      status: 'ONGOING',
    };
    let terms = [existing];
    vi.spyOn(fetcher, 'get').mockImplementation(async (pathname: string) => {
      if (pathname === 'central/activity-reports/term') return terms;
      throw new Error(`unexpected request: ${pathname}`);
    });
    vi.spyOn(fetcher, 'postWithoutResponse').mockImplementation(async () => {
      terms = [existing, created];
    });
    const user = userEvent.setup();
    render(
      <Suspense fallback={null}>
        <ReportClientPage />
      </Suspense>,
    );

    await user.click(await screen.findByRole('button', { name: '회차 생성' }));
    await pickStartDate(user, '2026년 7월 1일');
    await user.click(screen.getByRole('button', { name: '생성하기' }));

    expect(await screen.findByText('2회차')).toBeInTheDocument();
  });
});
