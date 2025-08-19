import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getClubMembers } from '@/apis';
import { MemberInfo } from '@/types/club';

export function useClubMembers(token: string) {
  return useQuery<unknown, AxiosError, AxiosResponse<MemberInfo>>({
    queryKey: ['admin/members'],
    queryFn: () => getClubMembers(token),
  });
}
