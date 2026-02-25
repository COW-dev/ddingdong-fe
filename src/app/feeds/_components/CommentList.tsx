'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Body2,
  Body3,
  Caption1,
  Flex,
  IconButton,
  usePortal,
} from 'ddingdong-design-system';
import toast from 'react-hot-toast';

import { getAnonymousUuid } from '@/app/_actions/anonymousUuid';
import { DeleteModal } from '@/app/admin/feed/_components/DeleteModal';
import { useDeleteFeedComment } from '@/app/_api/mutations/feed';
import { Comment } from '@/app/_api/types/feed';
import Admin from '@/assets/admin.webp';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { formatRelativeTime } from '@/utils/formatRelativeTime';

type CommentListProps = {
  feedId: number;
  comments: Comment[] | undefined;
};

export function CommentList({ feedId, comments }: CommentListProps) {
  const [myUuid, setMyUuid] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevCommentsLengthRef = useRef(comments?.length ?? 0);
  const hasComments = comments && comments.length > 0;

  useEffect(() => {
    getAnonymousUuid().then(setMyUuid);
  }, [comments]);

  useEffect(() => {
    const currentLength = comments?.length ?? 0;
    if (currentLength > prevCommentsLengthRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevCommentsLengthRef.current = currentLength;
  }, [comments]);

  return (
    <Flex dir="col" gap={4}>
      {hasComments ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            feedId={feedId}
            comment={comment}
            isOwner={myUuid === comment.uuid}
            myUuid={myUuid}
          />
        ))
      ) : (
        <Flex justifyContent="center" className="py-8">
          <Body2 className="text-gray-400">댓글이 존재하지 않습니다.</Body2>
        </Flex>
      )}
      <div ref={bottomRef} />
    </Flex>
  );
}

type CommentItemProps = {
  feedId: number;
  comment: Comment;
  isOwner: boolean;
  myUuid: string | null;
};

function CommentItem({ feedId, comment, isOwner, myUuid }: CommentItemProps) {
  const { isOpen, openModal, closeModal } = usePortal();
  const { mutate: deleteComment } = useDeleteFeedComment(feedId);

  const handleDelete = () => {
    if (!myUuid) return;

    deleteComment(
      { commentId: comment.id, anonymousUuid: myUuid },
      {
        onSuccess: () => {
          toast.success('댓글이 삭제되었습니다.');
          closeModal();
        },
        onError: () => {
          toast.error('댓글 삭제에 실패했습니다.');
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
        {isOwner && (
          <IconButton
            iconName="trash"
            size={18}
            color="gray"
            onClick={openModal}
          />
        )}
      </Flex>
      <DeleteModal isOpen={isOpen} onClose={closeModal} onDelete={handleDelete} />
    </>
  );
}
