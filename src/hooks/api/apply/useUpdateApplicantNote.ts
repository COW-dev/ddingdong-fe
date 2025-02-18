import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { ErrorType, updateApplicantNote } from '@/apis';
import { UpdateApplicantNote } from '@/types/apply';

export function useUpdateApplicantNote(
  applicantId: number,
): UseMutationResult<unknown, AxiosError<ErrorType>, UpdateApplicantNote> {
  const queryClient = useQueryClient();

  return useMutation(updateApplicantNote, {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['apply', applicantId],
      });
      toast.success('지원자의 메모를 수정했어요.');
    },
    onError(error) {
      const errorMessage = error.response?.data?.message
        ? `\n ${error.response?.data?.message}`
        : '';
      toast.error(`지원자의 메모 수정에 실패했어요. ${errorMessage}`);
    },
  });
}
