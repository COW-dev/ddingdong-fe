import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getDocumentInfo } from '@/apis';
import { DocumentDetail } from '@/types/document';

export function useDocumentInfo(id: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<DocumentDetail, unknown>,
    [string, number]
  >({
    queryKey: ['documents', id],
    queryFn: () => getDocumentInfo(id),
    enabled: !!id,
  });
}
