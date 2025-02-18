import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAllApplication } from '@/apis';
import { Application } from '@/types/apply';

export function useAllApplication(formId: number, token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Application, unknown>,
    [string, number]
  >({
    queryKey: ['apply', formId],
    queryFn: () => getAllApplication(formId, token),
  });
}
