'use client';

import { useState } from 'react';

import { Button, Flex, Icon, Input } from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { getOrCreateAnonymousUuid } from '@/app/_actions/anonymousUuid';
import { usePostFeedComment } from '@/app/_api/mutations/feed';

type CommentInputProps = {
  feedId: number;
  className?: string;
};

export function CommentInput({ feedId, className }: CommentInputProps) {
  const [commentText, setCommentText] = useState('');
  const { mutate: postComment, isPending } = usePostFeedComment(feedId);

  const handleSubmit = async () => {
    if (!commentText.trim() || isPending) return;

    const anonymousUuid = await getOrCreateAnonymousUuid();

    postComment(
      { content: commentText, anonymousUuid },
      {
        onSuccess: () => {
          setCommentText('');
          toast.success('댓글이 작성되었습니다.');
        },
        onError: () => {
          toast.error('댓글 작성에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Flex alignItems="center" gap={2} className={className}>
      <Input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        onClickReset={() => setCommentText('')}
        placeholder="댓글을 작성해주세요."
        className="h-[36px] md:h-[48px]"
        disabled={isPending}
      />
      <Button
        variant="primary"
        color="blue"
        onClick={handleSubmit}
        disabled={isPending}
      >
        {isPending ? (
          <Icon name="loading" color="white" className="animate-spin" />
        ) : (
          '작성'
        )}
      </Button>
    </Flex>
  );
}
