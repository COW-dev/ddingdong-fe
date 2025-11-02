import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { fixQueryKeys } from '../queries/fix';
import { NewFix } from '@/types/fix';

const resolveFix = (id: number) =>
  fetcher.patch(`admin/fix-zones/${id}?fixZoneId=${id}`);

export const useResolveFix = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => resolveFix(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...fixQueryKeys.detail(id)],
      });
    },
  });
};

const deleteCommet = (postId: number, commentId: number) =>
  fetcher.delete(`admin/fix-zones/${postId}/comments/${commentId}`);

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: number;
      commentId: number;
    }) => deleteCommet(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...fixQueryKeys.detail(postId)],
      });
    },
  });
};

const createCommet = (postId: number, comment: string) =>
  fetcher.post(`admin/fix-zones/${postId}/comments?fixZoneId=${postId}`, {
    json: { comment },
  });

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, comment }: { postId: number; comment: string }) =>
      createCommet(postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...fixQueryKeys.detail(postId)],
      });
    },
  });
};

const createFix = (post: NewFix) =>
  fetcher.post(`central/fix-zones`, {
    json: { post },
  });

export const useCreateFix = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: NewFix) => createFix(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...fixQueryKeys.my()],
      });
    },
  });
};
