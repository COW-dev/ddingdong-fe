import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getForm } from '@/apis';

export function useAdminForm(token: string, id?: number) {
  return useQuery({
    queryKey: ['adminForm', id],
    queryFn: () => {
      if (!id) throw new Error('Form ID is required');
      return getForm(token, id);
    },
    onError: (error) => {
      toast.error(error as string);
    },
  });
}
