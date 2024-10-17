import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import { createBanner } from '@/apis';
import { SubmitBanner } from '@/types/banner';

export type NewBannerProps = {
  bannerData: SubmitBanner;
  token: string;
};
export function useNewBanner(): UseMutationResult<
  unknown,
  AxiosError,
  NewBannerProps
> {
  const queryClient = useQueryClient();

  return useMutation(createBanner, {
    onSuccess() {
      queryClient.invalidateQueries(['banners']);
      toast.success('배너를 성공적으로 생성했어요.');
    },
    onError() {
      toast.error('배너 생성을 실패했어요');
    },
  });
}
