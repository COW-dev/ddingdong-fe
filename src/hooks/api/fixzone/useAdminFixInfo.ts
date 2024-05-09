import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAdminFixInfo } from '@/apis';
import { FixAdminDetailType } from '@/types/fix';
type Props = {
  token: string;
  id: number;
};
export function useAdminFixInfo({ token, id }: Props) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<FixAdminDetailType, unknown>,
    [string, number]
  >({
    queryKey: ['club/fix', id],
    queryFn: () => getAdminFixInfo(token, id),
  });
}
