'use client';
import { PropsWithChildren } from 'react';

import { Avatar, Button, Flex, TextArea } from 'ddingdong-design-system';

import { Comment } from '@/app/_api/types/fix';
import Admin from '@/assets/admin.jpg';
import { RoleType } from '@/constants/role';

import { useComment } from '../_hooks/useComment';

import { CommentItem } from './CommentItem';

export function FixComment({
  comments,
  id,
  role,
}: {
  comments: Comment[];
  id: number;
  role: keyof RoleType;
}) {
  return (
    <>
      {role === 'ROLE_ADMIN' && <CreateComment id={id} />}
      <CommentContainer>
        {comments.map((comment, index) => (
          <CommentItem role={role} key={index} comment={comment} postId={id} />
        ))}
      </CommentContainer>
    </>
  );
}

function CreateComment({ id }: { id: number }) {
  const { comment, handleSubmit, handleChangeMessage } = useComment(id);

  return (
    <Flex alignItems="center" justifyContent="center" gap={2}>
      <Avatar src={Admin.src} alt="admin image" size="sm" />
      <TextArea
        placeholder="댓글을 작성해 주세요."
        value={comment}
        rows={1}
        maxLength={255}
        onChange={handleChangeMessage}
        className="min-w-[70vw] max-sm:min-w-[60vw]"
      />
      <Button
        type="button"
        color="blue"
        variant="primary"
        onClick={handleSubmit}
        size="sm"
        className="h-13"
      >
        전송
      </Button>
    </Flex>
  );
}

function CommentContainer({ children }: PropsWithChildren) {
  return (
    <Flex dir="col" gap={2} className="py-6">
      {children}
    </Flex>
  );
}
