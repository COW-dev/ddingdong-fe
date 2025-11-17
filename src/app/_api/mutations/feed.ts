import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { feedQueryKeys } from '../queries/feed';
import { DeleteFeedAPIRequest, NewFeedAPIRequest } from '../types/feed';

const createFeed = async ({
  activityContent,
  mediaId,
  mimeType,
}: NewFeedAPIRequest) => {
  return await fetcher.post(`central/my/feeds`, {
    json: {
      activityContent,
      mediaId,
      mimeType,
    },
  });
};

export const useCreateFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewFeedAPIRequest) => createFeed(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [...feedQueryKeys.all()],
      });
    },
  });
};

const deleteFeed = async ({ feedId }: DeleteFeedAPIRequest) => {
  return await fetcher.delete(`central/my/feeds/${feedId}`);
};
export const useDeleteFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteFeedAPIRequest) => deleteFeed(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [...feedQueryKeys.all()],
      });
    },
  });
};
