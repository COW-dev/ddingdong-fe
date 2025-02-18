import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getFormDetail } from '@/apis';

export function useFormDetail(id: number, section: string) {
  return useQuery({
    queryKey: ['FormDetail', id, section],
    queryFn: () => getFormDetail(id, section),
    enabled: !!id && !!section,
    onError: (error) => {
      toast.error('폼지 조회에 문제가 생겼습니다' + (error as string));
    },
  });
}
