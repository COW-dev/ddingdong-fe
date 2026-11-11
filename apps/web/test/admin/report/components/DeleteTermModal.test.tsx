import { Suspense } from 'react';

import userEvent from '@testing-library/user-event';
import { Toaster } from 'react-hot-toast';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ApiError, fetcher } from '@/_api/fetcher';
import { Term } from '@/_api/types/report';
import { DeleteTermModal } from '@/admin/report/admin/_components/DeleteTermModal';
import { ReportClientPage } from '@/admin/report/admin/_pages/ReportClientPage';

import { render, screen, waitFor } from '../../../utils/render';

const terms: Term[] = [
  { term: 1, startDate: '2026-03-02', endDate: '2026-03-15', status: 'CLOSED' },
  {
    term: 2,
    startDate: '2026-07-01',
    endDate: '2026-07-14',
    status: 'UPCOMING',
  },
];

const mockTerms = (data: () => Term[]) =>
  vi.spyOn(fetcher, 'get').mockImplementation(async (pathname: string) => {
    if (pathname === 'central/activity-reports/term') return data();
    throw new Error(`unexpected request: ${pathname}`);
  });

afterEach(() => vi.restoreAllMocks());

describe('DeleteTermModal', () => {
  it('회차를 고르기 전에는 삭제할 수 없다', async () => {
    mockTerms(() => terms);
    render(
      <Suspense fallback={null}>
        <DeleteTermModal isOpen closeModal={vi.fn()} />
      </Suspense>,
    );

    expect(await screen.findByLabelText(/1회차/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '삭제하기' })).toBeDisabled();
  });

  it('선택한 회차를 삭제하면 모달이 닫힌다', async () => {
    mockTerms(() => terms);
    const remove = vi
      .spyOn(fetcher, 'deleteWithoutResponse')
      .mockResolvedValue(undefined);
    const closeModal = vi.fn();
    const user = userEvent.setup();
    render(
      <Suspense fallback={null}>
        <DeleteTermModal isOpen closeModal={closeModal} />
      </Suspense>,
    );

    await user.click(await screen.findByLabelText(/2회차/));
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    await waitFor(() => expect(closeModal).toHaveBeenCalledTimes(1));
    expect(remove).toHaveBeenCalledWith('admin/activity-reports/term?term=2');
  });

  it('삭제에 성공하면 회차 목록에서 해당 회차가 사라진다', async () => {
    let current = terms;
    mockTerms(() => current);
    vi.spyOn(fetcher, 'deleteWithoutResponse').mockImplementation(async () => {
      current = terms.filter(({ term }) => term !== 2);
    });
    const user = userEvent.setup();
    render(
      <Suspense fallback={null}>
        <ReportClientPage />
      </Suspense>,
    );

    await user.click(await screen.findByRole('button', { name: '회차 삭제' }));
    await user.click(await screen.findByLabelText(/2회차 ·/));
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    await waitFor(() =>
      expect(screen.queryByText('2회차')).not.toBeInTheDocument(),
    );
    expect(screen.getByText('1회차')).toBeInTheDocument();
  });

  it('제출된 보고서가 있어 400이면 삭제할 수 없다는 toast를 보여주고 모달은 열어둔다', async () => {
    mockTerms(() => terms);
    vi.spyOn(fetcher, 'deleteWithoutResponse').mockRejectedValue(
      new ApiError(400, '제출된 보고서가 있습니다.', '2026-07-01T00:00:00'),
    );
    const closeModal = vi.fn();
    const user = userEvent.setup();
    render(
      <>
        <Toaster />
        <Suspense fallback={null}>
          <DeleteTermModal isOpen closeModal={closeModal} />
        </Suspense>
      </>,
    );

    await user.click(await screen.findByLabelText(/1회차/));
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    expect(
      await screen.findByText('제출된 활동보고서가 있어 삭제할 수 없어요'),
    ).toBeInTheDocument();
    expect(closeModal).not.toHaveBeenCalled();
  });

  it('404면 안내 toast를 보여주고 목록을 다시 불러온다', async () => {
    let current = terms;
    const get = mockTerms(() => current);
    vi.spyOn(fetcher, 'deleteWithoutResponse').mockImplementation(async () => {
      current = terms.filter(({ term }) => term !== 2);
      throw new ApiError(
        404,
        '회차를 찾을 수 없습니다.',
        '2026-07-01T00:00:00',
      );
    });
    const user = userEvent.setup();
    render(
      <>
        <Toaster />
        <Suspense fallback={null}>
          <DeleteTermModal isOpen closeModal={vi.fn()} />
        </Suspense>
      </>,
    );

    await user.click(await screen.findByLabelText(/2회차/));
    await user.click(screen.getByRole('button', { name: '삭제하기' }));

    expect(
      await screen.findByText('이미 삭제되었거나 존재하지 않는 회차예요.'),
    ).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByLabelText(/2회차/)).toBeNull());
    expect(get).toHaveBeenCalledTimes(2);
  });
});
