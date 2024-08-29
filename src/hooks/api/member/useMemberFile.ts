import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMemberFile } from '@/apis';

export function useMemberFile(token: string) {
  return useQuery<unknown, AxiosError, AxiosResponse<Blob>>({
    queryKey: ['/club/my/club-members'],
    queryFn: () => getMemberFile(token),
  });
}
