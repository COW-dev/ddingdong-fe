import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { addMember } from '@/apis';
import { AddMember } from '@/types/club';

export function useAddMember(): UseMutationResult<
  AxiosResponse<any>,
  AxiosError,
  AddMember
> {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<any>, AxiosError, AddMember>(
    (params) => addMember(params),
    {
      onSuccess() {
        toast.success('동아리원이 성공적으로 추가되었어요.');
        queryClient.invalidateQueries(['admin/members']);
      },
      onError(error) {
        const errorData = error.response?.data;
        const errorMessage =
          errorData && typeof errorData === 'object' && 'message' in errorData
            ? `\n${(errorData as { message: string }).message}`
            : '';
        toast.error(`동아리원 추가에 실패했어요.${errorMessage}`);
      },
    },
  );
}
