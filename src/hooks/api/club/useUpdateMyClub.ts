import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ErrorType, updateMyClub } from '@/apis';
import { UpdateMyClub } from '@/types/club';

export function useUpdateMyClub(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  UpdateMyClub,
  [string]
> {
  const queryClient = useQueryClient();

  return useMutation(updateMyClub, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['club/my'],
      });
      toast.success('동아리 정보를 수정했어요.');
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`동아리 정보 수정을 실패했어요. ${errorMessage}`);
    },
  });
}
