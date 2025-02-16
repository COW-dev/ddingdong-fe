import { useQuery } from '@tanstack/react-query';
import { getForm } from '@/apis';

export function useAdminForm(token: string, id?: number) {
  return useQuery({
    queryKey: ['adminForm', id],
    queryFn: () => getForm(token, id!),
    enabled: !!id,
  });
}
