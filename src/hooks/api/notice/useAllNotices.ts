import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllNotices } from '@/apis';
import { Notice } from '@/types/notice';

export function useAllNotices(page: number) {
  return useQuery<AxiosResponse<Notice, unknown>, AxiosError>({
    queryKey: ['notices', page],
    queryFn: () => getAllNotices(page),
  });
}
