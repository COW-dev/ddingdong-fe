import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllBanners } from '@/apis';
import { ResponseBanner } from '@/types/banner';

export function useAllBanners() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ResponseBanner[], unknown>,
    [string]
  >({
    queryKey: ['banners'],
    queryFn: getAllBanners,
  });
}
