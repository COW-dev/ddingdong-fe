import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { applyDraw } from '@/apis';
import useModal from '@/hooks/common/useModal';

export function useApplyDraw(): UseMutationResult<
  unknown,
  AxiosError,
  FormData
> {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(applyDraw, {
    onSuccess() {
      queryClient.invalidateQueries(['events/apply']);
      toast.success('응모에 성공했습니다.');
      router.push('/event');
    },
    onError() {
      toast.error('응모에 실패했습니다.');
    },
  });
}
