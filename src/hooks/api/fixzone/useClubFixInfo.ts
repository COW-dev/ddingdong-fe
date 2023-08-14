import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getAdminFixInfo } from '@/apis';
import { FixClubDetail } from '@/types/fixzone';
type Props = {
  token: string;
  id: number;
};
export function useClubFixInfo({ token, id }: Props) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<FixClubDetail, unknown>,
    [string, number]
  >({
    queryKey: ['club/fix', id],
    queryFn: () => getAdminFixInfo(token, id),
  });
}
