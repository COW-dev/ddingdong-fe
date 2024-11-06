import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getClubMembers } from '@/apis';
import { Member } from '@/types/club';

export function useClubMembers(token: string) {
  return useQuery<unknown, AxiosError, AxiosResponse<Member[]>>({
    queryKey: ['/central/my/club-members'],
    queryFn: () => getClubMembers(token),
  });
}
