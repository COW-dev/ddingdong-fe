import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCookies } from 'react-cookie';
import Admin from '@/assets/admin.jpg';
import { useDeleteFixComment } from '@/hooks/api/fixzone/useDeleteFixComment';
import { useUpdateFixComment } from '@/hooks/api/fixzone/useUpdateFixComment';
import { Comment as CommentType } from '@/types/fix';

import 'dayjs/locale/ko';

interface CommentProps {
  info: CommentType;
}

function Comment({ info }: CommentProps) {
  const [{ token }] = useCookies(['token']);

  const { content, createdAt } = info;
  const updateMutation = useUpdateFixComment();
  const deleteMutation = useDeleteFixComment();

  dayjs.locale('ko');
  dayjs.extend(relativeTime);

  const handleClickDeleteButton = () => {
    deleteMutation.mutate({
      fixZonId: '1',
      commentId: '1',
      token,
    });
  };
  const handleClickUpdateButton = () => {
    updateMutation.mutate({
      fixZonId: '1',
      commentId: '1',
      content,
      token,
    });
  };

  return (
    <div className="flex w-full gap-4">
      <Image
        src={Admin}
        width={40}
        height={40}
        alt="admin image"
        className="rounded-full"
      />
      <div className="w-full">
        <div className="flex gap-2">
          <span className="font-bold">제40대 총동아리연합회 U:th</span>
          <time className="text-gray-500">{dayjs(createdAt).fromNow()}</time>
        </div>
        {content}
      </div>
      <div onClick={handleClickDeleteButton}>삭제</div>
      <div>수정</div>
    </div>
  );
}

export default Comment;
