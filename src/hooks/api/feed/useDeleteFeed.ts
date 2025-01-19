import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteFeed, ErrorType } from '@/apis';
import { DeleteFeed } from '@/types/feed';

export function useDeleteFeed(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  DeleteFeed
> {
  const queryClient = useQueryClient();
  return useMutation(deleteFeed, {
    onSuccess() {
      toast.success('피드를 성공적으로 삭제했어요.');
      queryClient.invalidateQueries(['feed']);
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`피드 삭제에 실패했어요.${errorMessage}`);
    },
  });
}
