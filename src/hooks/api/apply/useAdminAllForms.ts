import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getAllForms } from '@/apis';

export function useAllForms(token: string) {
  return useQuery({
    queryFn: () => getAllForms(token),
    onError: (error) => {
      const errorMessage =
        (error as any).response?.data?.message ||
        '폼 정보 수정에 실패했습니다.';
      toast.error(errorMessage);
    },
  });
}
