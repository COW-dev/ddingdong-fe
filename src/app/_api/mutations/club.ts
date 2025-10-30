import { UpdateMyClub } from '@/types/club';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { fetcher } from '../fetcher';
import { clubQueryKeys } from '../queries/club';

const updateClub = (club: UpdateMyClub) =>
  fetcher.patch('central/my', {
    json: club,
  });

export const useUpdateClub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMyClub) => updateClub(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...clubQueryKeys.my()],
      });
    },
  });
};
