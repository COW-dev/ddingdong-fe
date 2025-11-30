import { useQueryClient, useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { bannerQueryKeys } from '../queries/banner';
import { revalidateCache } from '../revalidate';
import { BannerAPIRequest } from '../types/banner';

const createBanner = (banner: BannerAPIRequest) =>
  fetcher.post('admin/banners', {
    json: banner,
  });

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BannerAPIRequest) => createBanner(data),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [...bannerQueryKeys.all()],
      });
      await revalidateCache('banners');
    },
  });
};

const deleteBanner = (id: number) => fetcher.delete(`admin/banners/${id}`);

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBanner(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [...bannerQueryKeys.all()],
      });
      await revalidateCache('banners');
    },
  });
};
