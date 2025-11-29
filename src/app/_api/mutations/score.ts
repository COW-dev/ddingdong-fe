import { useQueryClient, useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { ScoreQueryKeys } from '../queries/score';
import { ScoreAPIRequest } from '../types/score';

const createScore = (clubId: number, data: ScoreAPIRequest) =>
  fetcher.post(`admin/${clubId}/score`, {
    json: data,
  });

export const useCreateScore = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ScoreAPIRequest) => createScore(clubId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...ScoreQueryKeys.score(clubId)],
      });
    },
  });
};
