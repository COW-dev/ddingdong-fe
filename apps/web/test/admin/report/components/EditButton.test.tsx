import { Suspense } from 'react';

import userEvent from '@testing-library/user-event';
import { Toaster, toast } from 'react-hot-toast';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ApiError, fetcher } from '@/_api/fetcher';
import { EditButton } from '@/admin/report/[term]/[name]/_components/EditButton';

import { render, screen, waitFor } from '../../../utils/render';

const { push, back } = vi.hoisted(() => ({ push: vi.fn(), back: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, back }),
}));

const mockFetch = () =>
  vi.spyOn(fetcher, 'get').mockImplementation(async (pathname: string) => {
    if (pathname === 'central/activity-reports/current-term')
      return { term: 3 };
    if (pathname === 'central/my') return { name: '띵동' };
    throw new Error(`unexpected request: ${pathname}`);
  });

const renderButton = () =>
  render(
    <>
      <Toaster />
      <Suspense fallback={null}>
        <EditButton term={3} />
      </Suspense>
    </>,
  );

const confirmDelete = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(await screen.findByRole('button', { name: '삭제' }));
  await user.click(await screen.findByRole('button', { name: '삭제하기' }));
};

afterEach(() => {
  vi.restoreAllMocks();
  // toast 저장소는 모듈 전역이라 앞 테스트의 toast가 남음
  toast.remove();
  push.mockClear();
  back.mockClear();
});

describe('동아리 활동보고서 EditButton 삭제', () => {
  it('삭제에 성공하면 성공 toast를 보여주고 /report로 이동한다', async () => {
    mockFetch();
    const remove = vi.spyOn(fetcher, 'delete').mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderButton();

    await confirmDelete(user);

    expect(
      await screen.findByText('활동보고서를 삭제했어요.'),
    ).toBeInTheDocument();
    expect(remove).toHaveBeenCalledWith('central/my/activity-reports?term=3');
    await waitFor(() => expect(push).toHaveBeenCalledWith('/report'));
  });

  it('회차 기간이 아니라 400이면 안내 toast만 보여주고 성공 toast와 이동은 없다', async () => {
    mockFetch();
    vi.spyOn(fetcher, 'delete').mockRejectedValue(
      new ApiError(400, '회차 기간이 아닙니다.', '2026-07-10T00:00:00'),
    );
    const user = userEvent.setup();
    renderButton();

    await confirmDelete(user);

    expect(
      await screen.findByText('회차 기간이 아니라 처리할 수 없어요.'),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('활동보고서를 삭제했어요.'),
    ).not.toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
    expect(back).not.toHaveBeenCalled();
  });
});
