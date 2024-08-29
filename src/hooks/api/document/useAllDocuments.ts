import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllDocuments } from '@/apis';
import { Document } from '@/types/document';

export function useAllDocuments() {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Document[], unknown>,
    [string]
  >({
    queryKey: ['documents'],
    queryFn: getAllDocuments,
  });
}
