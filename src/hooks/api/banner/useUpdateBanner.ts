import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateBanner } from '@/apis';
import { UpdateBanner } from '@/types/banner';

export function useUpdateBanner(): UseMutationResult<
  unknown,
  AxiosError,
  UpdateBanner
> {
  const queryClient = useQueryClient();

  return useMutation(updateBanner, {
    onSuccess() {
      queryClient.invalidateQueries(['admin/banners']);
      toast.success('배너 정보를 수정했어요.');
    },
    onError() {
      toast.error('배너 정보 수정을 실패했어요');
    },
  });
}
