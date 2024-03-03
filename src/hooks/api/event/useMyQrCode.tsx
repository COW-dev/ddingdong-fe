import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMyQrCode } from '@/apis';
import { Uri } from '@/types/event';

export function useMyQrCode(studentName: string, studentNumber: number) {
  return useQuery<unknown, AxiosError, AxiosResponse<Uri, unknown>, [string]>({
    queryKey: ['events/stamps'],
    queryFn: () => getMyQrCode(studentName, studentNumber),
  });
}
