import { useEffect, useRef } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Admin from '@/assets/admin.jpg';
import FixCommentDropdown from '@/components/fix/comment/FixCommentDropdown';
import { Comment as CommentType } from '@/types/fix';
import 'dayjs/locale/ko';
import { adjustTextareaHeight } from '@/utils/adjust';

interface CommentProps {
  info: CommentType;
  fixZoneId: number;
}

dayjs.locale('ko');
dayjs.extend(relativeTime);

function Comment({ info, fixZoneId }: CommentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { content, createdAt, commentId } = info;

  useEffect(() => {
    adjustTextareaHeight(textareaRef);
  }, [content]);

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
        <div className="relative flex h-4 min-w-fit flex-col justify-center p-4">
          <FixCommentDropdown fixZoneId={fixZoneId} commentId={commentId} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
