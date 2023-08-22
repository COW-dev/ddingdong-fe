import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateFixComplete } from '@/apis';
import { FixComplete } from '@/types/fixzone';

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
      toast.success('동아리 정보를 수정했어요.');
    },
    onError() {
      toast.error('동아리 정보 수정을 실패했어요');
    },
  });
}
