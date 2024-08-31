import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateMembers } from '@/apis';
import { UpdateMember } from '@/types/club';

export function useUpdateMembers(): UseMutationResult<
  unknown,
  AxiosError,
  UpdateMember
> {
  const queryClient = useQueryClient();

  return useMutation(updateMembers, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['my-club'],
      });
      toast.success('동아리원 정보를 수정했어요.');
    },
    onError() {
      toast.error('동아리원 수정에 실패했어요');
    },
  });
}
