import { useQuery } from '@tanstack/react-query';
import { getAllForms } from '@/apis';

export function useAllForms(token: string) {
  return useQuery({
    queryKey: ['Forms'],
    queryFn: () => getAllForms(token),
    onError: (error) => {
      console.error(error);
    },
  });
}
