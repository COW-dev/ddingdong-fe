import { Suspense } from 'react';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetcher } from '@/_api/fetcher';
import { ReportCard as MyClubReportCard } from '@/admin/report/_components/ReportCard';
import { ReportCard as AdminReportCard } from '@/admin/report/admin/_components/ReportCard';

import { render, screen } from '../../../utils/render';

const termInfo = {
  term: 3,
  startDate: '2026-07-01',
  endDate: '2026-07-31',
};

const mockMyClubFetch = (
  myReports: {
    name: string;
    term: string;
    activityReports: [number, number];
  }[],
) =>
  vi.spyOn(fetcher, 'get').mockImplementation(async (pathname: string) => {
    if (pathname === 'central/my/activity-reports') return myReports;
    if (pathname === 'central/my') return { name: '띵동' };
    throw new Error(`unexpected request: ${pathname}`);
  });

afterEach(() => {
  vi.restoreAllMocks();
});

describe('총동연 ReportCard', () => {
  it('CLOSED면 "진행 종료" 배지와 제출 내역 링크를 보여준다', () => {
    render(<AdminReportCard termInfo={{ ...termInfo, status: 'CLOSED' }} />);

    expect(screen.getByText('진행 종료')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/report/admin/3');
  });

  it('ONGOING이면 "진행 중" 배지와 제출 내역 링크를 보여준다', () => {
    render(<AdminReportCard termInfo={{ ...termInfo, status: 'ONGOING' }} />);

    expect(screen.getByText('진행 중')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/report/admin/3');
  });

  it('UPCOMING이면 "진행 전" 배지만 보여주고 링크는 없다', () => {
    render(<AdminReportCard termInfo={{ ...termInfo, status: 'UPCOMING' }} />);

    expect(screen.getByText('진행 전')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

describe('동아리 ReportCard', () => {
  it('제출한 회차면 상태와 무관하게 "제출완료" 링크를 보여준다', async () => {
    mockMyClubFetch([{ name: '띵동', term: '3', activityReports: [1, 1] }]);

    render(
      <Suspense fallback={null}>
        <MyClubReportCard termInfo={{ ...termInfo, status: 'CLOSED' }} />
      </Suspense>,
    );

    expect(await screen.findByText('제출완료')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/report/3/띵동');
  });

  it('CLOSED + 미제출이면 "미제출" 배지만 보여주고 링크는 없다', async () => {
    mockMyClubFetch([]);

    render(
      <Suspense fallback={null}>
        <MyClubReportCard termInfo={{ ...termInfo, status: 'CLOSED' }} />
      </Suspense>,
    );

    expect(await screen.findByText('미제출')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('ONGOING + 미제출이면 "제출하기" 링크로 새 보고서 작성에 진입한다', async () => {
    mockMyClubFetch([]);

    render(
      <Suspense fallback={null}>
        <MyClubReportCard termInfo={{ ...termInfo, status: 'ONGOING' }} />
      </Suspense>,
    );

    expect(await screen.findByText('제출하기')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/report/3/new');
  });

  it('UPCOMING이면 "제출하기" 배지만 보여주고 링크는 없다', async () => {
    mockMyClubFetch([]);

    render(
      <Suspense fallback={null}>
        <MyClubReportCard termInfo={{ ...termInfo, status: 'UPCOMING' }} />
      </Suspense>,
    );

    expect(await screen.findByText('제출하기')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
