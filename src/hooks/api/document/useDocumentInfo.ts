import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getDocumentInfo } from '@/apis';
import { NoticeDetail } from '@/types/notice';

export function useDocumentInfo(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<NoticeDetail, unknown>,
    [string, number]
  >({
    queryKey: ['documents', id],
    queryFn: () => getDocumentInfo(id),
  });
}
