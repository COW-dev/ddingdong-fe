import {
  UseMutationResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, beforeEach, expect } from 'vitest';

import { useCreateScore } from '@/app/_api/mutations/score';
import { ScoreAPIRequest, ScoreDetail } from '@/app/_api/types/score';
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

type Options = {
  mutate?: (
    variables: ScoreAPIRequest,
    options?: {
      onSuccess?: () => void;
      onError?: (error: Error) => void;
    },
  ) => void;
};

function mockCreateScoreMutation(
  options: Options = {},
): Partial<UseMutationResult<void, Error, ScoreAPIRequest, unknown>> {
  return {
    mutate: (options.mutate ?? vi.fn()) as UseMutationResult<
      void,
      Error,
      ScoreAPIRequest,
      unknown
    >['mutate'],
  };
}

function setupScorePageForValidation() {
  mockUseSuspenseQuery.mockReturnValue(
    createSuspenseQueryResult({ totalScore: 100, scoreHistories: [] }),
  );
}

describe('점수 추가 시 validation 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('사유가 없으면 점수 추가가 되지 않는다', async () => {
    const user = userEvent.setup();
    const mutateSpy = vi.fn();

    setupScorePageForValidation();
    vi.mocked(useCreateScore).mockReturnValue(
      mockCreateScoreMutation({
        mutate: mutateSpy,
      }) as UseMutationResult<void, Error, ScoreAPIRequest, unknown>,
    );

    render(<ScoreClientPage id="1" />);

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(screen.getByPlaceholderText('점수를 입력해주세요.'), '10');
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    expect(mutateSpy).not.toHaveBeenCalled();
  });

  it('점수가 없으면 점수 추가가 되지 않는다', async () => {
    const user = userEvent.setup();
    const mutateSpy = vi.fn();

    setupScorePageForValidation();
    vi.mocked(useCreateScore).mockReturnValue(
      mockCreateScoreMutation({
        mutate: mutateSpy,
      }) as UseMutationResult<void, Error, ScoreAPIRequest, unknown>,
    );

    render(<ScoreClientPage id="1" />);

    await user.click(screen.getByText(CATEGORY.CLEANING.name));
    await user.type(
      screen.getByPlaceholderText('사유를 입력해주세요.'),
      '테스트 사유',
    );
    await user.click(screen.getByRole('button', { name: /점수 추가하기/ }));

    expect(mutateSpy).not.toHaveBeenCalled();
  });
});
