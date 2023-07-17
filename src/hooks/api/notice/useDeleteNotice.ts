import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteNotice } from '@/apis';
import { DeleteNotice } from '@/types';

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
    },
    onError(error) {
      console.log(error);
    },
  });
}
