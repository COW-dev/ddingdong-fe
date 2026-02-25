import { Body2, Body3, Caption1, Flex } from 'ddingdong-design-system';

import { Comment } from '@/app/_api/types/feed';
import Admin from '@/assets/admin.webp';
import { OptimizedImage } from '@/components/common/OptimizedImage';
import { formatRelativeTime } from '@/utils/formatRelativeTime';

type CommentListProps = {
  comments: Comment[] | undefined;
  commentCount?: number;
};

export function CommentList({ comments, commentCount = 0 }: CommentListProps) {
  const hasComments = comments && comments.length > 0;

  return (
    <Flex dir="col" gap={4}>
      {hasComments ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <Flex justifyContent="center" className="py-8">
          <Body2 className="text-gray-400">댓글이 존재하지 않습니다.</Body2>
        </Flex>
      )}
    </Flex>
  );
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <Flex alignItems="center" className="gap-3 pb-2">
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
  );
}
