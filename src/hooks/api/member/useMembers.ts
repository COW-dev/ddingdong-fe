import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateMembers } from '@/apis';

export function useUpdateMembers(): UseMutationResult<
  unknown,
  AxiosError,
  FormData
> {
  const queryClient = useQueryClient();

  return useMutation(updateMembers, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['/club/my/club-members'],
      });
      toast.success('동아리원 정보를 수정했어요.');
    },
    onError() {
      toast.error('동아리원 정보 수정을 실패했어요');
    },
  });
}
