import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import { ScoreHistory } from '@/app/_api/types/score';
import { CATEGORY } from '@/app/admin/club/[id]/score/_consts/category';
import ScoreClientPage from '@/app/admin/club/[id]/score/_pages/ScoreClientPage';
import { setupScorePage } from '@/test/__tests__/score/score.test.setup';
import { render } from '@/test/utils';

vi.mock('@/app/_api/mutations/score', () => ({
  useCreateScore: vi.fn(),
}));

describe('상세 내역 동기화', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('점수 데이터가 요약 영역과 히스토리 영역에 정상적으로 표시된다', () => {
    const scoreHistories: ScoreHistory[] = [
      {
        scoreCategory: CATEGORY.CLEANING.name,
        reason: '10월 청소평가',
        amount: 10.24,
        createdAt: new Date().toISOString(),
      },
      {
        scoreCategory: CATEGORY.ACTIVITY_REPORT.name,
        reason: '10월 전동대회 참여',
        amount: 20,
        createdAt: new Date().toISOString(),
      },
    ];

    const totalScore = scoreHistories.reduce((acc, cur) => acc + cur.amount, 0);

    setupScorePage({
      initialData: { totalScore, scoreHistories },
    });

    render(<ScoreClientPage id="1" />);

    expect(
      screen.getByText(new RegExp(`총점\\s*:\\s*${totalScore}\\s*점`)),
    ).toBeInTheDocument();

    expect(screen.getAllByText(CATEGORY.CLEANING.name).length).toBeGreaterThan(
      0,
    );
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
          amount: 10.2,
          createdAt: new Date().toISOString(),
        },
        {
          scoreCategory: name,
          reason: `${name} 테스트 2`,
          amount: 5.5,
          createdAt: new Date().toISOString(),
        },
        {
          scoreCategory: otherCategoryName,
          reason: `${otherCategoryName} 다른 데이터`,
          amount: 20,
          createdAt: new Date().toISOString(),
        },
      ];

      const totalScore = scoreHistories.reduce(
        (acc, cur) => acc + cur.amount,
        0,
      );

      setupScorePage({
        initialData: { totalScore, scoreHistories },
      });

      render(<ScoreClientPage id="1" />);

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
