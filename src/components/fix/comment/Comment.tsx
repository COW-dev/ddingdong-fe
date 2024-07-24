import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Admin from '@/assets/admin.jpg';
import { Comment as CommentType } from '@/types/fix';
import 'dayjs/locale/ko';

interface CommentProps {
  info: CommentType;
}

function Comment({ info }: CommentProps) {
  const { content, createdAt } = info;

  dayjs.locale('ko');
  dayjs.extend(relativeTime);

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
    </div>
  );
}

export default Comment;
