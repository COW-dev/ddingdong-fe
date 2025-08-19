import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteMember } from '@/apis';
import { DeleteMember } from '@/types/club';

export function useDeleteMember(): UseMutationResult<
  unknown,
  AxiosError,
  DeleteMember
> {
  const queryClient = useQueryClient();

  return useMutation(deleteMember, {
    onSuccess() {
      toast.success('동아리원을 성공적으로 삭제했어요.');
      queryClient.invalidateQueries(['admin/members']);
    },
    onError(error) {
      const errorData = error.response?.data as
        | { message?: string }
        | undefined;
      const errorMessage = errorData?.message ? `\n ${errorData.message}` : '';
      toast.error(`동아리원 삭제에 실패했어요.${errorMessage}`);
    },
  });
}
