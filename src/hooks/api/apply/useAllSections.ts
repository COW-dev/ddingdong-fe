import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSections } from '@/apis';

export function useAllSections(id: number) {
  return useQuery({
    queryKey: ['Sections'],
    queryFn: () => getSections(id),
    enabled: !!id,
    onError: (error) => {
      toast.error('조회에 오류가 발생하였습니다' + (error as string));
    },
  });
}
