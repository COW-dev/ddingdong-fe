import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSections } from '@/apis';

export function useAllSections(id: number) {
  return useQuery({
    queryKey: ['Sections'],
    queryFn: () => getSections(id),
    enabled: !!id,
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다';
      toast.error(`조회에 오류가 발생하였습니다: ${errorMessage}`);
    },
  });
}
