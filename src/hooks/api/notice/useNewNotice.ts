import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createNotice } from '@/apis';

export function useNewNotice(): UseMutationResult<
  unknown,
  AxiosError,
  FormData
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(createNotice, {
    onSuccess() {
      queryClient.invalidateQueries(['notices']);
      router.push('/notice');
      toast.success('공지를 성공적으로 등록했어요.');
    },
    onError() {
      toast.error('공지 등록을 실패했어요.');
    },
  });
}
