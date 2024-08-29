import { useQuery } from '@tanstack/react-query';
import { getFixInfo } from '@/apis';
import { FixDetailInfo } from '@/types/fix';

type Props = {
  token: string;
  id: number;
};

export function useFixInfo({ token, id }: Props) {
  return useQuery<FixDetailInfo>({
    queryKey: ['fix', id],
    queryFn: () => getFixInfo(token, id),
  });
}
