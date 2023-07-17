import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createClub } from '@/apis';
import { NewClub } from '@/types';

export function useNewClub(): UseMutationResult<unknown, AxiosError, NewClub> {
  const queryClient = useQueryClient();

  return useMutation(createClub, {
    onSuccess() {
      queryClient.invalidateQueries(['admin/clubs']);
      toast.success('동아리를 성공적으로 생성했어요.');
    },
    onError(error) {
      console.log(error);
      toast.error('동아리 생성을 실패했어요');
    },
  });
}