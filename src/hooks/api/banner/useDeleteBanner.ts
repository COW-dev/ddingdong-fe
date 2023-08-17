import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteBanner } from '@/apis';
import { DeleteBanner } from '@/types/banner';

export function useDeleteBanner(): UseMutationResult<
  unknown,
  AxiosError,
  DeleteBanner
> {
  const queryClient = useQueryClient();

  return useMutation(deleteBanner, {
    onSuccess() {
      queryClient.invalidateQueries(['banners']);
      toast.success('배너를 성공적으로 삭제했어요.');
    },
    onError() {
      toast.error('배너 삭제를 실패했어요');
    },
  });
}
