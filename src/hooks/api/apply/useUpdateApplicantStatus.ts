import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ErrorType, updateApplicantStatus } from '@/apis';
import { UpdateApplicantStatus } from '@/types/apply';

export function useUpdateApplicantStatus(): UseMutationResult<
  unknown,
  AxiosError<ErrorType>,
  UpdateApplicantStatus
> {
  const queryClient = useQueryClient();
  return useMutation(updateApplicantStatus, {
    onSuccess() {
      toast.success('지원자 상태 수정에 성공했어요.');
      queryClient.invalidateQueries(['apply']);
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`지원자 상태 수정에 실패했어요.${errorMessage}`);
    },
  });
}
