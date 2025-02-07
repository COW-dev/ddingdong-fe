import { getAllForms } from '@/apis';
import { useQuery, useMutation } from '@tanstack/react-query';

export function useAllForms(token: string) {
  return useQuery({
    queryKey: ['Forms'],
    queryFn: () => getAllForms(token),
    onError: (error) => {
      console.error(error);
    },
  });
}
