import router from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { deleteDocument } from '@/apis';
import { DeleteDocument } from '@/types/document';

export function useDeleteDocument(): UseMutationResult<
  unknown,
  AxiosError,
  DeleteDocument
> {
  const queryClient = useQueryClient();

  return useMutation(deleteDocument, {
    onSuccess() {
      queryClient.invalidateQueries(['/documents']);
      router.push('/documents');
      toast.success('자료을 성공적으로 삭제했어요.');
    },
    onError() {
      toast.error('자료 삭제에 실패했어요.');
    },
  });
}
