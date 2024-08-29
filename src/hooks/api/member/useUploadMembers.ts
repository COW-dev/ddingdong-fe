import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { uploadMembers } from '@/apis';

export function useUploadMembers(): UseMutationResult<
  unknown,
  AxiosError,
  FormData
> {
  const queryClient = useQueryClient();

  return useMutation(uploadMembers, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['/club/my/club-members'],
      });
      toast.success('동아리원 정보를 수정했어요.');
    },
    onError() {
      toast.error('동아리원 수정에 실패했어요');
    },
  });
}
