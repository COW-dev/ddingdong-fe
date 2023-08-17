import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { updateNotice } from '@/apis';

export function useUpdateNotice(
  noticeId: number,
): UseMutationResult<unknown, AxiosError, FormData, [number]> {
  const queryClient = useQueryClient();

  return useMutation((formData: FormData) => updateNotice(noticeId, formData), {
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['notices'],
      });
      toast.success('공지사항을 수정했어요.');
    },
    onError(error) {
      toast.error('공지사항 수정을 실패했어요');
    },
  });
}
