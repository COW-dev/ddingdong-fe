'use client';

import dayjs from 'dayjs';
import TextareaAutosize from 'react-textarea-autosize';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import {
  usePortal,
  Flex,
  Avatar,
  Body3,
  TextArea,
  Modal,
  Body1,
  DoubleButton,
  Button,
  Body2,
  IconButton,
} from 'ddingdong-design-system';

import { useDeleteComment } from '@/app/_api/mutations/fix';
import { Comment } from '@/app/_api/types/fix';
import Admin from '@/assets/admin.jpg';
import { RoleType } from '@/constants/role';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function CommentItem({
  comment,
  role,
  postId,
}: {
  comment: Comment;
  role: keyof RoleType;
  postId: number;
}) {
  const { content, createdAt, id: commentId } = comment;
  const { isOpen, openModal, closeModal } = usePortal();
  const mutation = useDeleteComment(postId);

  const handleClickDeleteButton = () => {
    mutation.mutate({
      postId,
      commentId: commentId,
    });
    closeModal();
  };

  return (
    <Flex className="gap-1 md:gap-4">
      <Avatar src={Admin.src} alt="admin image" size="sm" />
      <Flex justifyContent="between" className="w-full">
        <div>
          <Flex className="flex-col md:flex-row md:gap-2">
            <Body3>제41대 총동아리연합회 Mode</Body3>
            <time className="truncate text-gray-500">
              {dayjs(createdAt).fromNow()}
            </time>
          </Flex>
          <TextareaAutosize
            readOnly
            value={content}
            className="w-[65vw] resize-none focus:outline-0"
          />
        </div>
        {role === 'ROLE_ADMIN' && (
          <Flex
            dir="col"
            justifyContent="center"
            className="relative h-4 min-w-fit"
          >
            <IconButton iconName="trash" onClick={openModal} />
          </Flex>
        )}
      </Flex>
      <TrashModal
        isOpen={isOpen}
        closeModal={closeModal}
        onDelete={handleClickDeleteButton}
      />
    </Flex>
  );
}

type TrashModalProps = {
  isOpen: boolean;
  closeModal: VoidFunction;
  onDelete: VoidFunction;
};

function TrashModal({ isOpen, closeModal, onDelete }: TrashModalProps) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-[80vw] md:w-[380px]"
      >
        <Flex dir="col" alignItems="center" className="w-full py-2">
          <Body1>댓글을 삭제하시겠습니까?</Body1>
        </Flex>

        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={closeModal}>
              <Body2 weight="bold">닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="red"
              size="full"
              onClick={() => {
                onDelete();
                closeModal();
              }}
            >
              <Body2 weight="bold">삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
