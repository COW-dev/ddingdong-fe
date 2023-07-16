import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { createClub } from '@/apis';
import { NewClub } from '@/types';

export function useNewClub(): UseMutationResult<unknown, AxiosError, NewClub> {
  const queryClient = useQueryClient();

  return useMutation(createClub, {
    onSuccess() {
      queryClient.invalidateQueries(['admin/clubs']);
    },
    onError(error) {
      console.log(error);
    },
  });
}
