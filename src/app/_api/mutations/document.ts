import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { documentQueryKeys } from '../queries/document';
import { DocumentAPIRequest } from '../types/document';

const addDocument = (data: DocumentAPIRequest) =>
  fetcher.post('admin/documents', { json: data });

const deleteDocument = (id: number) => fetcher.delete(`admin/documents/${id}`);

export const useAddDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DocumentAPIRequest) => addDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...documentQueryKeys.all()],
      });
    },
  });
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...documentQueryKeys.all()],
      });
    },
  });
};
