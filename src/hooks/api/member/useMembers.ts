import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getMembers } from '@/apis';
import { Member } from '@/types/member';

export function useMembers(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<Member[], unknown>,
    [string]
  >({
    queryKey: ['admin/member'],
    queryFn: () => getMembers(token),
  });
}
