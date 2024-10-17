import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getBanners } from '@/apis';
import { ResponseBanner } from '@/types/banner';

export function useBanners() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ResponseBanner[], unknown>,
    [string]
  >({
    queryKey: ['banners'],
    queryFn: getBanners,
  });
}
