import { useQueryClient, useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { clubQueryKeys } from '../queries/club';
import { UpdateClubDetailAPIRequest } from '../types/club';

const updateClub = (club: UpdateClubDetailAPIRequest) =>
  fetcher.patch('central/my', {
    json: club,
  });

export const useUpdateClub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateClubDetailAPIRequest) => updateClub(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...clubQueryKeys.my()],
      });
    },
  });
};
