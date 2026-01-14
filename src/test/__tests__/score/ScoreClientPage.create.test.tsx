import {
  UseMutationResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach } from 'vitest';

import { useCreateScore } from '@/app/_api/mutations/score';
import {
  ScoreAPIRequest,
  ScoreDetail,
  ScoreHistory,
} from '@/app/_api/types/score';
import { CATEGORY } from '@/app/admin/club/[id]/score/_consts/category';
import ScoreClientPage from '@/app/admin/club/[id]/score/_pages/ScoreClientPage';
import { createSuspenseQueryResult } from '@/test/setup';
import { render } from '@/test/utils';

vi.mock('@/app/_api/mutations/score', () => ({
  useCreateScore: vi.fn(),
}));

const { mockUseSuspenseQuery } = vi.hoisted(() => {
  return {
    mockUseSuspenseQuery:
      vi.fn<() => UseSuspenseQueryResult<ScoreDetail, Error>>(),
  };
});

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useSuspenseQuery: mockUseSuspenseQuery,
  };
});

function setupScorePage({
  initialData,
  updatedData,
}: {
  initialData: ScoreDetail;
  updatedData?: ScoreDetail;
}) {
  mockUseSuspenseQuery.mockReturnValueOnce(
    createSuspenseQueryResult(initialData),
  );

  vi.mocked(useCreateScore).mockReturnValue({
    mutate: (_data: ScoreAPIRequest, options?: { onSuccess?: () => void }) => {
      const { onSuccess } = options || {};
      if (updatedData) {
        mockUseSuspenseQuery.mockReturnValue(
          createSuspenseQueryResult(updatedData),
        );
      }
      onSuccess?.();
    },
  } as UseMutationResult<void, Error, ScoreAPIRequest, unknown>);
}

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

      const initialTotalScore = 100;
      const updatedTotalScore = initialTotalScore + newHistory.amount;

      setupScorePage({
        initialData: {
          totalScore: initialTotalScore,
          scoreHistories: [],
        },
        updatedData: {
          totalScore: updatedTotalScore,
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

    const initialTotalScore = 100;
    const newScore = 10;
    const newHistory: ScoreHistory = {
      scoreCategory: CATEGORY.CLEANING.name,
      reason: '테스트',
      amount: newScore,
      createdAt: new Date().toISOString(),
    };
    const updatedTotalScore = initialTotalScore + newScore;

    setupScorePage({
      initialData: {
        totalScore: initialTotalScore,
        scoreHistories: [],
      },
      updatedData: {
        totalScore: updatedTotalScore,
        scoreHistories: [newHistory],
      },
    });

    const { rerender } = render(<ScoreClientPage id="1" />);

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

    rerender(<ScoreClientPage id="1" />);

    await screen.findByText(new RegExp(`총점\\s*:\\s*${updatedTotalScore}`));
  });
});
