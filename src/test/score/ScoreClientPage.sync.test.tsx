import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import { ScoreDetail, ScoreHistory } from '@/app/_api/types/score';
import { CATEGORY } from '@/app/admin/club/[id]/score/_consts/category';
import ScoreClientPage from '@/app/admin/club/[id]/score/_pages/ScoreClientPage';
import { mockFetcher } from '@/test/setup';
import { render, testQueryClient } from '@/test/utils';

describe('동아리 점수 추가 시 상세 내역 동기화 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetcher.get.mockReset();
    testQueryClient.clear();
  });

  it('점수 데이터가 요약 영역과 히스토리 영역에 정상적으로 표시된다', async () => {
    const scoreHistories: ScoreHistory[] = [
      {
        scoreCategory: CATEGORY.CLEANING.name,
        reason: '10월 청소평가',
        amount: 11,
        createdAt: '2024-10-15T10:30:00.000Z',
      },
      {
        scoreCategory: CATEGORY.ACTIVITY_REPORT.name,
        reason: '10월 전동대회 참여',
        amount: 20,
        createdAt: '2024-10-16T14:20:00.000Z',
      },
    ];

    const totalScore = scoreHistories.reduce((acc, cur) => acc + cur.amount, 0);
    const initialData: ScoreDetail = { totalScore, scoreHistories };

    mockFetcher.get.mockResolvedValue(initialData);

    render(<ScoreClientPage id="1" />);

    await screen.findByText('총점 : 31점');

    const historyTable = screen.getByRole('table');

    expect(
      within(historyTable).getByText(CATEGORY.CLEANING.name),
    ).toBeInTheDocument();
    expect(within(historyTable).getByText('11점')).toBeInTheDocument();
    expect(within(historyTable).getByText('2024-10-15')).toBeInTheDocument();

    expect(
      within(historyTable).getByText(CATEGORY.ACTIVITY_REPORT.name),
    ).toBeInTheDocument();
    expect(within(historyTable).getByText('20점')).toBeInTheDocument();
    expect(within(historyTable).getByText('2024-10-16')).toBeInTheDocument();
  });

  it.each(Object.entries(CATEGORY))(
    '%s 카테고리 클릭 시 해당 카테고리의 상세 내역만 표시된다',
    async (categoryKey, { name }) => {
      const user = userEvent.setup();

      const otherCategoryKey = Object.keys(CATEGORY).find(
        (key) => key !== categoryKey,
      )!;
      const otherCategoryName = CATEGORY[otherCategoryKey].name;

      const scoreHistories: ScoreHistory[] = [
        {
          scoreCategory: name,
          reason: `${name} 테스트 1`,
          amount: 10,
          createdAt: '2024-10-15T10:30:00.000Z',
        },
        {
          scoreCategory: name,
          reason: `${name} 테스트 2`,
          amount: 6,
          createdAt: '2024-10-16T14:20:00.000Z',
        },
        {
          scoreCategory: otherCategoryName,
          reason: `${otherCategoryName} 다른 데이터`,
          amount: 20,
          createdAt: '2024-10-17T09:15:00.000Z',
        },
      ];

      const totalScore = scoreHistories.reduce(
        (acc, cur) => acc + cur.amount,
        0,
      );
      const initialData: ScoreDetail = { totalScore, scoreHistories };

      mockFetcher.get.mockResolvedValue(initialData);

      render(<ScoreClientPage id="1" />);

      await screen.findByText('총점 : 36점');

      const categoryElements = screen.getAllByText(name);
      await user.click(categoryElements[categoryElements.length - 1]);

      expect(screen.getByText('상세내역')).toBeInTheDocument();
      expect(screen.getByText(`${name} 테스트 1`)).toBeInTheDocument();
      expect(screen.getByText(`${name} 테스트 2`)).toBeInTheDocument();
      expect(
        screen.queryByText(`${otherCategoryName} 다른 데이터`),
      ).not.toBeInTheDocument();
    },
  );
});
