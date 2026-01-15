import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import { useCreateScore } from '@/app/_api/mutations/score';
import { ScoreQueryKeys } from '@/app/_api/queries/score';
import { ScoreDetail, ScoreHistory } from '@/app/_api/types/score';
import { CATEGORY } from '@/app/admin/club/[id]/score/_consts/category';
import ScoreClientPage from '@/app/admin/club/[id]/score/_pages/ScoreClientPage';
import { mockFetcher } from '@/test/setup';
import { render, testQueryClient } from '@/test/utils';

vi.mock('@/app/_api/mutations/score', () => ({
  useCreateScore: vi.fn(),
}));

describe('동아리 카테고리 별 점수 추가 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetcher.get.mockReset();
    testQueryClient.clear();
  });

  it.each(Object.entries(CATEGORY).map(([key, value]) => [key, value.name]))(
    '%s 카테고리 점수 추가 시 즉시 리스트에 반영된다',
    async (_key, name) => {
      const user = userEvent.setup();
      const clubId = 1;

      const newHistory: ScoreHistory = {
        scoreCategory: name,
        reason: '테스트 사유',
        amount: 10,
        createdAt: new Date().toISOString(),
      };

      const initialData: ScoreDetail = {
        totalScore: 100,
        scoreHistories: [],
      };

      const updatedData: ScoreDetail = {
        totalScore: initialData.totalScore + newHistory.amount,
        scoreHistories: [newHistory],
      };

      mockFetcher.get.mockResolvedValueOnce(initialData);
      mockFetcher.get.mockResolvedValueOnce(updatedData);

      vi.mocked(useCreateScore).mockReturnValue({
        mutate: (_data, options) => {
          testQueryClient.invalidateQueries({
            queryKey: ScoreQueryKeys.score(clubId),
          });
          (options?.onSuccess as () => void)?.();
        },
      } as ReturnType<typeof useCreateScore>);

      render(<ScoreClientPage id="1" />);

      await screen.findByText(
        new RegExp(`총점\\s*:\\s*${initialData.totalScore}\\s*점`),
      );

      await user.click(screen.getByText(name));
      await user.type(
        screen.getByPlaceholderText('사유를 입력해주세요.'),
        '테스트 사유',
      );
      await user.type(
        screen.getByPlaceholderText('점수를 입력해주세요.'),
        '10',
      );
      await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

      const historyTable = await screen.findByRole('table');

      await within(historyTable).findByText(name);
      expect(within(historyTable).getByText(/10\s*점/)).toBeInTheDocument();
    },
  );

  it('점수 추가 시 totalScore에 반영된다', async () => {
    const user = userEvent.setup();
    const clubId = 1;

    const newScore = 10;
    const newHistory: ScoreHistory = {
      scoreCategory: CATEGORY.CLEANING.name,
      reason: '테스트',
      amount: newScore,
      createdAt: new Date().toISOString(),
    };

    const initialData: ScoreDetail = {
      totalScore: 100,
      scoreHistories: [],
    };

    const updatedData: ScoreDetail = {
      totalScore: initialData.totalScore + newScore,
      scoreHistories: [newHistory],
    };

    mockFetcher.get.mockResolvedValueOnce(initialData);
    mockFetcher.get.mockResolvedValueOnce(updatedData);

    vi.mocked(useCreateScore).mockReturnValue({
      mutate: (_data, options) => {
        testQueryClient.invalidateQueries({
          queryKey: ScoreQueryKeys.score(clubId),
        });
        (options?.onSuccess as () => void)?.();
      },
    } as ReturnType<typeof useCreateScore>);

    render(<ScoreClientPage id="1" />);

    await screen.findByText(
      new RegExp(`총점\\s*:\\s*${initialData.totalScore}\\s*점`),
    );

    await user.click(screen.getByText(CATEGORY.CLEANING.name));

    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트',
    );
    await user.type(
      screen.getByPlaceholderText('점수를 입력해주세요.'),
      String(newScore),
    );
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    await screen.findByText(
      new RegExp(`총점\\s*:\\s*${updatedData.totalScore}\\s*점`),
      {},
    );
  });
});
