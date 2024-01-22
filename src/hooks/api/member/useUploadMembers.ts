import { useRouter } from 'next/router';
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
  const router = useRouter();

  return useMutation(uploadMembers, {
    onSuccess() {
      queryClient.invalidateQueries(['/club/my/club-upload']);
      router.push('/member');
      toast.success('동아리원을 성공적으로 등록했어요.');
    },
    onError() {
      toast.error('동아리원을 업로드에 실패했어요.');
    },
  });
}
