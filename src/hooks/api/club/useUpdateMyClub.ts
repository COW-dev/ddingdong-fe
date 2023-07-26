import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateMyClub } from '@/apis';
import { UpdateMyClub } from '@/types/club';

export function useUpdateMyClub(): UseMutationResult<
  unknown,
  AxiosError,
  UpdateMyClub
> {
  const queryClient = useQueryClient();

  return useMutation(updateMyClub, {
    onSuccess() {
      queryClient.invalidateQueries(['my-club']);
      toast.success('동아리 정보를 수정했어요.');
    },
    onError(error) {
      console.log(error);
      toast.error('동아리 정보 수정을 실패했어요');
    },
  });
}
