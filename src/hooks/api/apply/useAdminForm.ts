import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getForm } from '@/apis';

export function useAdminForm(token: string, id: number) {
  return useQuery({
    queryKey: ['adminForm', id],
    queryFn: () => {
      return getForm(token, id);
    },
    onError: (error) => {
      toast.error(error as string);
    },
  });
}
