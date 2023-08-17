import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllBanners } from '@/apis';
import { BannerType } from '@/types/banner';

export function useAllBanners() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<BannerType[], unknown>,
    [string]
  >({
    queryKey: ['banners'],
    queryFn: getAllBanners,
  });
}
