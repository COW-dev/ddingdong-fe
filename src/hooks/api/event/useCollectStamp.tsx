import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { collectStamp } from '@/apis';
import { CollectStamp } from '@/types/event';

export function useCollectStamp(): UseMutationResult<
  unknown,
  AxiosError,
  CollectStamp
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(collectStamp, {
    onSuccess() {
      queryClient.invalidateQueries(['/qr-stamps/collect']);
      toast.success('도장 수집에 성공하였습니다.');
      router.push('/event');
    },
    onError() {
      toast.error('도장 수집에 실패했어요.');
    },
  });
}
