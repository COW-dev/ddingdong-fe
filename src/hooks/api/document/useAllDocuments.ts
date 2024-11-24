import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllDocuments } from '@/apis';
import { Document } from '@/types/document';

export function useAllDocuments(page: number) {
  return useQuery<AxiosResponse<Document, unknown>, AxiosError>({
    queryKey: ['documents', page],
    queryFn: () => getAllDocuments(page),
    keepPreviousData: true,
  });
}
