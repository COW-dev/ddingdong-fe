import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAdminAllClubs } from '@/apis';
import { AdminClub } from '@/types';

export function useAdminAllClubs(token: string) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<AdminClub[], unknown>,
    [string]
  >({
    queryKey: ['admin/clubs'],
    queryFn: () => getAdminAllClubs(token),
  });
}
