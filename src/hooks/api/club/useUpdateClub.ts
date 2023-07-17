import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateClub } from '@/apis';
import { UpdateClub } from '@/types';

export function useUpdateClub(): UseMutationResult<
  unknown,
  AxiosError,
  UpdateClub
> {
  const queryClient = useQueryClient();

  return useMutation(updateClub, {
    onSuccess() {
      queryClient.invalidateQueries(['admin/clubs']);
      toast.success('동아리 정보를 수정했어요.');
    },
    onError(error) {
      console.log(error);
      toast.error('동아리 정보 수정을 실패했어요');
    },
  });
}
