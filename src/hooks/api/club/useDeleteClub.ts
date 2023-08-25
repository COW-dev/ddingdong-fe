import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteClub } from '@/apis';
import { DeleteClub } from '@/types/club';

export function useDeleteClub(): UseMutationResult<
  unknown,
  AxiosError,
  DeleteClub
> {
  const queryClient = useQueryClient();

  return useMutation(deleteClub, {
    onSuccess() {
      queryClient.invalidateQueries(['admin/clubs']);
      toast.success('동아리를 성공적으로 삭제했어요.');
    },
    onError() {
      toast.error('동아리 삭제를 실패했어요');
    },
  });
}
