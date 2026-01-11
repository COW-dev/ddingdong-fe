import {
  UseMutationResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { vi } from 'vitest';

import { useCreateScore } from '@/app/_api/mutations/score';
import { ScoreAPIRequest, ScoreDetail } from '@/app/_api/types/score';
import { mockUseSuspenseQuery } from '@/test/setup';

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
): UseMutationResult<void, Error, ScoreAPIRequest, unknown> {
  return {
    // @ts-expect-error - mutate
    mutate: options.mutate ?? vi.fn(),
    mutateAsync: vi.fn(),
    reset: vi.fn(),
    status: 'idle',
    isIdle: true,
    isPending: false,
    isError: false,
    isSuccess: false,
    data: undefined,
    error: null,
    failureCount: 0,
    failureReason: null,
    submittedAt: 0,
    variables: undefined,
    context: undefined,
    isPaused: false,
  };
}

export function setupScorePage({
  initialData,
  updatedData,
}: {
  initialData: ScoreDetail;
  updatedData?: ScoreDetail;
}) {
  // @ts-expect-error - mockUseSuspenseQuery
  mockUseSuspenseQuery.mockReturnValueOnce({
    data: initialData,
    status: 'success',
    error: null,
    isError: false,
  } as UseSuspenseQueryResult<ScoreDetail, Error>);

  vi.mocked(useCreateScore).mockReturnValue(
    mockCreateScoreMutation({
      mutate: (
        _data: ScoreAPIRequest,
        options?: { onSuccess?: () => void },
      ) => {
        const { onSuccess } = options || {};
        if (updatedData) {
          // @ts-expect-error - mockUseSuspenseQuery
          mockUseSuspenseQuery.mockReturnValue({
            data: updatedData,
            status: 'success',
            error: null,
            isError: false,
          } as UseSuspenseQueryResult<ScoreDetail, Error>);
        }
        onSuccess?.();
      },
    }),
  );
}

export function setupScorePageForValidation() {
  // @ts-expect-error - mockUseSuspenseQuery
  mockUseSuspenseQuery.mockReturnValue({
    data: { totalScore: 100, scoreHistories: [] },
    status: 'success',
    error: null,
    isError: false,
  } as UseSuspenseQueryResult<ScoreDetail, Error>);
}

export { mockCreateScoreMutation };
