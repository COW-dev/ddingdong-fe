import { useQuery } from '@tanstack/react-query';
import { AxiosError, type AxiosResponse } from 'axios';
import { getFixInfo } from '@/apis';
import { FixDetailInfo } from '@/types/fix';

type Props = {
  token: string;
  id: number;
};

export function useFixInfo({ token, id }: Props) {
  return useQuery<
    unknown,
    AxiosError,
    AxiosResponse<FixDetailInfo, unknown>,
    [string, number]
  >({
    queryKey: ['fix', id],
    queryFn: () => getFixInfo(token, id),
  });
}
