import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllDocuments } from '@/apis';
import { Notice } from '@/types/notice';

export function useAllDocuments() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Notice[], unknown>,
    [string]
  >({
    queryKey: ['documents'],
    queryFn: getAllDocuments,
  });
}
