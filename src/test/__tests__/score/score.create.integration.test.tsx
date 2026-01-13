import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach } from 'vitest';

import { ScoreHistory } from '@/app/_api/types/score';
import { CATEGORY } from '@/app/admin/club/[id]/score/_consts/category';
import ScoreClientPage from '@/app/admin/club/[id]/score/_pages/ScoreClientPage';
import { setupScorePage } from '@/test/__tests__/score/score.test.setup';
import { render } from '@/test/utils';

vi.mock('@/app/_api/mutations/score', () => ({
  useCreateScore: vi.fn(),
}));

describe('점수 추가 - 정상 플로우', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(Object.entries(CATEGORY).map(([key, value]) => [key, value.name]))(
    '%s 카테고리 점수 추가 시 즉시 리스트에 반영된다',
    async (_key, name) => {
      const user = userEvent.setup();

      const newHistory: ScoreHistory = {
        scoreCategory: name,
        reason: '테스트 사유',
        amount: 10,
        createdAt: new Date().toISOString(),
      };

      setupScorePage({
        initialData: {
          totalScore: 100,
          scoreHistories: [],
        },
        updatedData: {
          totalScore: 110,
          scoreHistories: [newHistory],
        },
      });

      const { rerender } = render(<ScoreClientPage id="1" />);

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

      rerender(<ScoreClientPage id="1" />);

      await screen.findByText('테스트 사유');
    },
  );

  it('점수 추가 시 totalScore에 반영된다', async () => {
    const user = userEvent.setup();

    setupScorePage({
      initialData: {
        totalScore: 100,
        scoreHistories: [],
      },
      updatedData: {
        totalScore: 110,
        scoreHistories: [
          {
            scoreCategory: CATEGORY.CLEANING.name,
            reason: '테스트',
            amount: 10,
            createdAt: new Date().toISOString(),
          },
        ],
      },
    });

    const { rerender } = render(<ScoreClientPage id="1" />);

    await user.click(screen.getByText(CATEGORY.CLEANING.name));

    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트',
    );
    await user.type(screen.getByPlaceholderText('점수를 입력해주세요.'), '10');
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    rerender(<ScoreClientPage id="1" />);

    await screen.findByText(/110/);
  });
});
