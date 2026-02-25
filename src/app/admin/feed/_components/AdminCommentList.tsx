'use client';

import { useState } from 'react';

import {
  Body2,
  Body3,
  Caption1,
  Flex,
  IconButton,
  usePortal,
} from 'ddingdong-design-system';
import toast from 'react-hot-toast';

import { useAdminDeleteFeedComment } from '@/app/_api/mutations/feed';
import { Comment } from '@/app/_api/types/feed';
import Admin from '@/assets/admin.webp';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { formatRelativeTime } from '@/utils/formatRelativeTime';

import { DeleteModal } from './DeleteModal';

type AdminCommentListProps = {
  feedId: number;
  comments: Comment[] | undefined;
};

export function AdminCommentList({ feedId, comments }: AdminCommentListProps) {
  const hasComments = comments && comments.length > 0;

  return (
    <Flex dir="col" gap={4}>
      {hasComments ? (
        comments.map((comment) => (
          <AdminCommentItem
            key={comment.id}
            feedId={feedId}
            comment={comment}
          />
        ))
      ) : (
        <Flex justifyContent="center" className="py-8">
          <Body2 className="text-gray-400">댓글이 존재하지 않습니다.</Body2>
        </Flex>
      )}
    </Flex>
  );
}

type AdminCommentItemProps = {
  feedId: number;
  comment: Comment;
};

function AdminCommentItem({ feedId, comment }: AdminCommentItemProps) {
  const { isOpen, openModal, closeModal } = usePortal();
  const { mutate: deleteComment } = useAdminDeleteFeedComment(feedId);

  const handleDelete = () => {
    deleteComment(
      { commentId: comment.id },
      {
        onSuccess: () => {
          toast.success('댓글이 삭제되었습니다.');
          closeModal();
        },
        onError: () => {
          toast.error('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="between" className="gap-3 pb-2">
        <Flex alignItems="center" className="gap-3">
          <OptimizedImage
            src={Admin.src}
            alt="Admin"
            width={40}
            height={40}
            className="rounded-full border border-gray-100"
          />
          <Flex dir="col" justifyContent="center" className="border-gray-100">
            <Flex gap={2} alignItems="center">
              <Body3 weight="medium">{comment.anonymousName}</Body3>
              <Caption1 weight="normal" className="text-gray-400">
                {formatRelativeTime(comment.createdAt)}
              </Caption1>
            </Flex>
            <Caption1 weight="normal" className="mt-1">
              {comment.content}
            </Caption1>
          </Flex>
        </Flex>
        <IconButton
          iconName="trash"
          size={18}
          color="gray"
          onClick={openModal}
        />
      </Flex>
      <DeleteModal
        isOpen={isOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </>
  );
}
