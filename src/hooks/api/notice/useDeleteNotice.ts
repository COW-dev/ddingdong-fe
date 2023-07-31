import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteNotice } from '@/apis';
import { DeleteNotice } from '@/types/notice';

export function useDeleteNotice(): UseMutationResult<
  unknown,
  AxiosError,
  DeleteNotice
> {
  const queryClient = useQueryClient();

  return useMutation(deleteNotice, {
    onSuccess() {
      queryClient.invalidateQueries(['notices']);
      router.push('/notice');
      toast.success('공지를 성공적으로 삭제했어요.');
    },
    onError(error) {
      console.log(error);
      toast.error('공지 삭제에 실패했어요.');
    },
  });
}
