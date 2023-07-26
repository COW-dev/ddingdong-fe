import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createBanner } from '@/apis';
import { NewBanner } from '@/types/banner';

export function useNewBanner(): UseMutationResult<
  unknown,
  AxiosError,
  NewBanner
> {
  const queryClient = useQueryClient();

  return useMutation(createBanner, {
    onSuccess() {
      queryClient.invalidateQueries(['banners']);
      toast.success('배너를 성공적으로 생성했어요.');
    },
    onError(error) {
      console.log(error);
      toast.error('배너 생성을 실패했어요');
    },
  });
}
