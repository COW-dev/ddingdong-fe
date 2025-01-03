import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ErrorType, updateNotice } from '@/apis';
import { UpdateNotice } from '@/types/notice';

export function useUpdateNotice(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  UpdateNotice
> {
  const queryClient = useQueryClient();

  return useMutation(updateNotice, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['notice'],
      });
      toast.success('공지사항을 수정했어요.');
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`공지사항 수정에 실패했어요. ${errorMessage}`);
    },
  });
}
