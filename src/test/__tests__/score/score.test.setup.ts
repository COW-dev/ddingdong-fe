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
    }) as UseMutationResult<void, Error, ScoreAPIRequest, unknown>,
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
