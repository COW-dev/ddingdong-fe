import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMyCollects } from '@/apis';
import { Colletions } from '@/types/event';

export function useMyCollects(studentName: string, studentNumber: number) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Colletions, unknown>,
    [string]
  >({
    queryKey: ['/events/stamps'],
    queryFn: () => getMyCollects(studentName, studentNumber),
  });
}
