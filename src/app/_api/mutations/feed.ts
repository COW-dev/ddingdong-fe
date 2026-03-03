import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '../fetcher';
import { feedQueryKeys } from '../queries/feed';
import {
  CreateFeedCommentAPIRequest,
  DeleteCommentAPIRequest,
  CreateFeedCommentAPIResponse,
  NewFeedAPIRequest,
  DeleteFeedAPIRequest,
  LikeFeedAPIRequest,
  FeedDetail,
  Comment,
} from '../types/feed';

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

const createFeedComment = async ({
  feedId,
  content,
  anonymousUuid,
}: { feedId: number; anonymousUuid: string } & CreateFeedCommentAPIRequest) => {
  return await fetcher.post<CreateFeedCommentAPIResponse>(
    `feeds/${feedId}/comments`,
    {
      json: { content },
      headers: {
        'X-Anonymous-UUID': anonymousUuid,
      },
    },
  );
};

export const usePostFeedComment = (feedId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateFeedCommentAPIRequest & { anonymousUuid: string },
    ) =>
      createFeedComment({
        feedId,
        content: data.content,
        anonymousUuid: data.anonymousUuid,
      }),
    onSuccess(response, variables) {
      queryClient.setQueryData<FeedDetail>(
        feedQueryKeys.detail(feedId),
        (oldData) => {
          if (!oldData) return oldData;

          const newComment: Comment = {
            id: response.commentId,
            uuid: variables.anonymousUuid,
            anonymousName: `익명${response.anonymousNumber}`,
            content: variables.content,
            createdAt: new Date().toISOString(),
          };

          return {
            ...oldData,
            commentCount: oldData.commentCount + 1,
            comments: [...oldData.comments, newComment],
          };
        },
      );
    },
  });
};

const deleteComment = async ({
  feedId,
  commentId,
  anonymousUuid,
}: {
  feedId: number;
  commentId: number;
  anonymousUuid: string;
}) => {
  return await fetcher.delete(`feeds/${feedId}/comments/${commentId}`, {
    headers: {
      'X-Anonymous-UUID': anonymousUuid,
    },
  });
};

export const useDeleteFeedComment = (feedId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { commentId: number; anonymousUuid: string }) =>
      deleteComment({
        feedId,
        commentId: data.commentId,
        anonymousUuid: data.anonymousUuid,
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: feedQueryKeys.all(),
      });
    },
  });
};

const adminDeleteFeed = async ({
  feedId,
  commentId,
}: DeleteCommentAPIRequest) => {
  return await fetcher.delete(`central/feeds/${feedId}/comments/${commentId}`);
};

export const useAdminDeleteFeedComment = (feedId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { commentId: number }) =>
      adminDeleteFeed({
        feedId,
        commentId: data.commentId,
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: feedQueryKeys.detail(feedId),
      });
    },
  });
};

const likeFeed = async (feedId: number, { count }: LikeFeedAPIRequest) => {
  return await fetcher.patch(`feeds/${feedId}/likes`, {
    json: { count },
  });
};

export const useLikeFeed = (feedId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LikeFeedAPIRequest) => likeFeed(feedId, data),
    onSuccess(_, variables) {
      queryClient.setQueryData<FeedDetail>(
        feedQueryKeys.detail(feedId),
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            likeCount: oldData.likeCount + variables.count,
          };
        },
      );
    },
  });
};
