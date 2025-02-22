import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { registerApplicants } from '@/apis';
import { RegisterApplicant } from '@/types/apply';

export function useRegisterApplicant(): UseMutationResult<
  unknown,
  AxiosError,
  RegisterApplicant
> {
  const queryClient = useQueryClient();

  return useMutation(registerApplicants, {
    onSuccess() {
      queryClient.invalidateQueries(['email']);
      toast.success('동아리원 명단 연동에 성공했어요.');
    },
    onError() {
      toast.error('동아리원 명단 연동에 실패했어요.');
    },
  });
}
