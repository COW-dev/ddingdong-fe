import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getClubFixInfo } from '@/apis';
import { FixClubDetailType } from '@/types/fix';
type Props = {
  token: string;
  id: number;
};
export function useClubFixInfo({ token, id }: Props) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<FixClubDetailType, unknown>,
    [string, number]
  >({
    queryKey: ['club/fix', id],
    queryFn: () => getClubFixInfo(token, id),
  });
}
