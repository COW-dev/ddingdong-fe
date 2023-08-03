import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createClub } from '@/apis';
import { NewClub } from '@/types/club';

export function useNewClub(): UseMutationResult<unknown, AxiosError, NewClub> {
  const queryClient = useQueryClient();

  return useMutation(createClub, {
    onSuccess() {
      queryClient.invalidateQueries(['admin/clubs']);
      toast.success('동아리를 성공적으로 생성했어요.');
    },
    onError(error) {
      toast.error('동아리 생성에 실패하였어요.');
    },
  });
}
