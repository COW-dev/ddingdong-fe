import { useEffect, useRef } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCookies } from 'react-cookie';
import Admin from '@/assets/admin.jpg';
import Bin from '@/assets/bin-red.svg';
import AlertDialog from '@/components/common/AlertDialog';
import { ROLE_TYPE } from '@/constants/text';
import { useDeleteFixComment } from '@/hooks/api/fixzone/useDeleteFixComment';
import useModal from '@/hooks/common/useModal';
import { Comment as CommentType } from '@/types/fix';
import { adjustTextareaHeight } from '@/utils/change';
import Modal from '../../common/Modal';
import 'dayjs/locale/ko';

type CommentProps = {
  info: CommentType;
  fixZoneId: number;
};

dayjs.locale('ko');
dayjs.extend(relativeTime);

function Comment({ info, fixZoneId }: CommentProps) {
  const [{ token, role }] = useCookies(['token', 'role']);
  const deleteMutation = useDeleteFixComment(fixZoneId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { content, createdAt, commentId } = info;

  const { openModal, visible, closeModal, modalRef } = useModal();

  useEffect(() => {
    adjustTextareaHeight(textareaRef);
  }, [content]);

  const handleClickDeleteButton = () => {
    deleteMutation.mutate({
      fixZoneId: fixZoneId,
      commentId: commentId,
      token,
    });
    closeModal();
  };

  return (
    <div className="my-1 flex gap-4">
      <div className="min-w-fit">
        <Image
          src={Admin}
          width={40}
          height={40}
          alt="admin image"
          className="rounded-full"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="min-h-fit">
          <div className="flex gap-2">
            <span className="font-bold">제40대 총동아리연합회 U:th</span>
            <time className="text-gray-500">{dayjs(createdAt).fromNow()}</time>
          </div>
          <textarea
            disabled={true}
            className="h-auto w-[65vw] resize-none bg-white py-1"
            value={content}
            ref={textareaRef}
          />
        </div>
        {role === ROLE_TYPE.ROLE_ADMIN && (
          <div className="relative flex h-4 min-w-fit flex-col justify-center p-2">
            <Image
              className="cursor-pointer hover:opacity-50"
              src={Bin}
              alt={'휴지통 이미지'}
              width={20}
              height={20}
              onClick={openModal}
            />
          </div>
        )}
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        closeButton={false}
        closeModal={closeModal}
      >
        <AlertDialog
          onConfirm={handleClickDeleteButton}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

export default Comment;
