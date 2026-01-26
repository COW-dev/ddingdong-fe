import { screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import { Term } from '@/app/_api/types/report';
import { ReportClientPage } from '@/app/admin/report/admin/_pages/ReportClientPage';
import { mockFetcher } from '@/test/setup';
import { render, testQueryClient } from '@/test/utils';

describe('활동보고서 관리 페이지 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetcher.get.mockReset();
    testQueryClient.clear();
  });

  it('과거 학기일 때 빨간색 뱃지 "진행 종료"가 노출되고 상세 조회 링크가 존재한다', async () => {
    const pastTerm: Term = {
      term: 14,
      startDate: '2024-01-01T00:00:00.000Z',
      endDate: '2024-06-30T23:59:59.999Z',
    };

    const terms: Term[] = [pastTerm];

    mockFetcher.get.mockResolvedValue(terms);

    render(<ReportClientPage />);

    await screen.findByText('활동보고서 관리');

    const badge = screen.getByText('진행 종료');
    expect(badge).toBeInTheDocument();
    expect(badge.closest('div')).toHaveClass('bg-red-100', 'text-red-300');

    const link = screen.getByRole('link', { name: /14회차/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/report/admin/14');

    const card = link.querySelector('li');
    expect(card).toBeInTheDocument();
    expect(card).not.toHaveClass('cursor-not-allowed');
  });

  it('미래 학기일 때 회색 뱃지 "진행 전"이 노출되고 카드가 disabled 상태이며 상세 조회 링크가 없다', async () => {
    const futureTerm: Term = {
      term: 16,
      startDate: '2025-01-01T00:00:00.000Z',
      endDate: '2025-06-30T23:59:59.999Z',
    };

    const terms: Term[] = [futureTerm];

    mockFetcher.get.mockResolvedValue(terms);

    render(<ReportClientPage />);

    await screen.findByText('활동보고서 관리');

    const badge = screen.getByText('진행 전');
    expect(badge).toBeInTheDocument();
    expect(badge.closest('div')).toHaveClass('bg-gray-100', 'text-gray-400');

    const card = screen.getByText('16회차').closest('li');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('cursor-not-allowed');

    const link = screen.queryByRole('link', { name: /16회차/ });
    expect(link).not.toBeInTheDocument();
  });

  it('현재 학기일 때 초록색 뱃지 "진행 중"이 노출되고 상세 조회 링크가 존재한다', async () => {
    const currentTerm: Term = {
      term: 15,
      startDate: '2024-07-01T00:00:00.000Z',
      endDate: '2024-12-31T23:59:59.999Z',
    };

    const terms: Term[] = [currentTerm];

    mockFetcher.get.mockResolvedValue(terms);

    render(<ReportClientPage />);

    await screen.findByText('활동보고서 관리');

    const badge = screen.getByText('진행 중');
    expect(badge).toBeInTheDocument();
    expect(badge.closest('div')).toHaveClass('bg-green-50', 'text-green-200');

    const link = screen.getByRole('link', { name: /15회차/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/report/admin/15');

    const card = link.querySelector('li');
    expect(card).toBeInTheDocument();
    expect(card).not.toHaveClass('cursor-not-allowed');
  });
});
