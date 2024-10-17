import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAdminBanners } from '@/apis';
import { ResponseBanner } from '@/types/banner';

export function useAdminBanners(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<ResponseBanner[], unknown>,
    [string]
  >({
    queryKey: ['banners'],
    queryFn: () => getAdminBanners(token),
  });
}
