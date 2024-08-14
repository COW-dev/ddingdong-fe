import { redirect } from 'next/dist/server/api-utils';
import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateFixComplete } from '@/apis';
import { FixComplete } from '@/types/fix';

export function useUpdateComplete(): UseMutationResult<
  unknown,
  AxiosError,
  FixComplete
> {
  const queryClient = useQueryClient();

  return useMutation(updateFixComplete, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['admin/fix'],
      });
      toast.success('처리완료 처리를 완료했어요.');
      router.push('/fix');
    },
    onError() {
      toast.error('처리완료 처리를 실패했어요');
    },
  });
}
