import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateNotice } from '@/apis';
import { UpdateNotice } from '@/types';

export function useUpdateNotice(): UseMutationResult<
  unknown,
  AxiosError,
  UpdateNotice
> {
  const queryClient = useQueryClient();

  return useMutation(updateNotice, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['notice'] });
      toast.success('공지사항을 수정했어요.');
    },
    onError(error) {
      console.log(error);
      toast.error('공지사항 수정을 실패했어요');
    },
  });
}
