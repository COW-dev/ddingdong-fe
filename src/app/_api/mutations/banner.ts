import { useQueryClient, useMutation } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { bannerQueryKeys } from '../queries/banner';
import { NewBanner } from '../types/banner';

const createBanner = (banner: NewBanner) =>
  fetcher.post('admin/banners', {
    json: banner,
  });

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewBanner) => createBanner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...bannerQueryKeys.all()],
      });
    },
  });
};

const deleteBanner = (id: number) => fetcher.delete(`admin/banners/${id}`);

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteBanner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...bannerQueryKeys.all()],
      });
    },
  });
};
