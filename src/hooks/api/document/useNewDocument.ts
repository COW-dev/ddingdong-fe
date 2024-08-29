import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { createDocument } from '@/apis';

export function useNewDocument(): UseMutationResult<
  unknown,
  AxiosError,
  FormData
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(createDocument, {
    onSuccess() {
      queryClient.invalidateQueries(['documents']);
      router.push('/documents');
      toast.success('자료를 성공적으로 등록했어요.');
    },
    onError() {
      toast.error('자료 등록에 실패했어요.');
    },
  });
}
