import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

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
      toast.success('자료가 업로드되었습니다.');
    },
    onError: () => {
      toast.error('자료 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
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
      toast.success('자료가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('자료 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};
