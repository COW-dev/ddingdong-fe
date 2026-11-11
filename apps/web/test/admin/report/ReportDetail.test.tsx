import { Suspense } from 'react';

import userEvent from '@testing-library/user-event';
import { Toaster, toast } from 'react-hot-toast';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ApiError, fetcher } from '@/_api/fetcher';
import { ReportAPIResponse, TermReport } from '@/_api/types/report';
import { ReportDetailClientPage } from '@/admin/report/admin/[term]/[name]/_pages/ReportDetailClientPage';

import { render, screen, waitFor } from '../../utils/render';

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, back: vi.fn() }),
}));

const termReports: TermReport[] = [
  { club: { id: 7, name: '띵동' }, activityReports: [1, 1] },
];

const report: ReportAPIResponse = {
  id: 1,
  createdAt: '2026-07-10 12:00',
  name: '띵동',
  content: '활동 내용',
  place: '명지대',
  startDate: '2026-07-09 10:00',
  endDate: '2026-07-09 12:00',
  image: { originUrl: '', cdnUrl: '' },
  participants: [],
};

const mockFetch = () =>
  vi.spyOn(fetcher, 'get').mockImplementation(async (pathname: string) => {
    if (pathname === 'admin/activity-reports?term=3') return termReports;
    if (pathname === 'admin/activity-reports/clubs/7?term=3')
      return [report, report];
    if (pathname === 'admin/activity-reports/clubs/0?term=3')
      return [report, report];
    throw new Error(`unexpected request: ${pathname}`);
  });

const renderPage = (name = '띵동') =>
  render(
    <>
      <Toaster />
      <Suspense fallback={null}>
        <ReportDetailClientPage term={3} name={name} />
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
});

describe('총동연 활동보고서 상세', () => {
  it('삭제 버튼만 보여주고 수정 버튼은 없다', async () => {
    mockFetch();
    renderPage();

    expect(
      await screen.findByRole('button', { name: '삭제' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '수정' }),
    ).not.toBeInTheDocument();
  });

  it('동아리를 찾지 못하면 삭제 버튼을 보여주지 않는다', async () => {
    mockFetch();
    renderPage('없는동아리');

    expect(await screen.findByText('3회차 / 없는동아리')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '삭제' }),
    ).not.toBeInTheDocument();
  });

  it('삭제에 성공하면 보고서를 다시 조회하지 않고 회차 목록으로 이동한다', async () => {
    const get = mockFetch();
    const remove = vi
      .spyOn(fetcher, 'deleteWithoutResponse')
      .mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderPage();

    await confirmDelete(user);

    await waitFor(() => expect(push).toHaveBeenCalledWith('/report/admin/3'));
    expect(remove).toHaveBeenCalledWith(
      'admin/activity-reports/clubs/7?term=3',
    );
    expect(
      await screen.findByText('활동보고서를 삭제했어요.'),
    ).toBeInTheDocument();
    // 삭제된 보고서를 다시 조회하면 404가 나 에러 화면으로 빠짐
    expect(get).toHaveBeenCalledTimes(2);
  });

  it('이미 삭제되어 404면 안내 toast를 보여주고 회차 목록으로 이동한다', async () => {
    mockFetch();
    vi.spyOn(fetcher, 'deleteWithoutResponse').mockRejectedValue(
      new ApiError(
        404,
        '활동보고서를 찾을 수 없습니다.',
        '2026-07-10T00:00:00',
      ),
    );
    const user = userEvent.setup();
    renderPage();

    await confirmDelete(user);

    expect(
      await screen.findByText('이미 삭제된 활동보고서예요.'),
    ).toBeInTheDocument();
    expect(push).toHaveBeenCalledWith('/report/admin/3');
  });

  it('그 외 에러면 서버 메시지를 toast로 보여주고 이동하지 않는다', async () => {
    mockFetch();
    vi.spyOn(fetcher, 'deleteWithoutResponse').mockRejectedValue(
      new ApiError(500, '서버 오류가 발생했습니다.', '2026-07-10T00:00:00'),
    );
    const user = userEvent.setup();
    renderPage();

    await confirmDelete(user);

    expect(
      await screen.findByText('서버 오류가 발생했습니다.'),
    ).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
