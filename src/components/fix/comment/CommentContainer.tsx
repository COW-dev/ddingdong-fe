import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import Admin from '@/assets/admin.jpg';
import { ROLE_TYPE } from '@/constants/position';
import { useNewFixComment } from '@/hooks/api/fixzone/useNewFixComment';
import { Comment as CommentType } from '@/types/fix';
import { adjustTextareaHeight } from '@/utils/change';
import Comment from './Comment';

type CommentContainerProps = {
  comments: CommentType[];
  fixZoneId: number;
};

function CommentContainer({ comments, fixZoneId }: CommentContainerProps) {
  const [{ role }] = useCookies(['role']);
  const [{ token }] = useCookies(['token']);
  const [content, setContent] = useState<string>('');
  const mutation = useNewFixComment(fixZoneId);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    mutation.mutate({ token, content, fixZoneId });
    setContent('');
  };

  const handleChangeMessage = (message: string) => {
    setContent(message);
    if (message.length === 255)
      toast(
        <span className="text-center">
          255자 이하로 작성해주세요. <br />
          현재 글자 수 : {message.length}
        </span>,
      );
  };

  useEffect(() => {
    adjustTextareaHeight(textareaRef);
  }, [content]);

  return (
    <>
      <div
        className={`flex w-full gap-2 text-sm ${
          role === ROLE_TYPE.ROLE_CLUB && 'hidden'
        }`}
      >
        <div className="min-w-fit">
          <Image
            src={Admin}
            width={40}
            height={40}
            alt="admin image"
            className="rounded-full"
          />
        </div>
        <textarea
          placeholder="코멘트를 작성해 주세요."
          value={content}
          ref={textareaRef}
          maxLength={255}
          rows={1}
          onChange={(e) => handleChangeMessage(e.target.value)}
          className="w-full resize-none rounded-3xl bg-gray-100 p-2.5 text-[#878787] outline-none"
        />
        <div className="min-w-fit">
          <button
            role="button"
            onClick={handleSubmit}
            className="rounded-3xl bg-blue-500 p-2.5 text-xs font-semibold text-white md:text-sm"
          >
            댓글 작성
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-6 text-sm">
        {comments.map((comment, index) => (
          <Comment key={index} info={comment} fixZoneId={fixZoneId} />
        ))}
      </div>
    </>
  );
}

export default CommentContainer;
