import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllForms } from '@/apis';

export function useAllForms(token: string) {
  return useQuery({
    queryKey: ['adminAllForms'],
    queryFn: () => getAllForms(token),
    onError: (error) => {
      toast.error('폼 목록을 불러오는데 실패했습니다.');
    },
  });
}
