import { useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Admin from '@/assets/admin.jpg';
import { ROLE_TYPE } from '@/constants/text';
import { useNewFixComment } from '@/hooks/api/fixzone/useNewFixComment';
import { cn } from '@/lib/utils';
import { Comment as CommentType } from '@/types/fix';
import Comment from './Comment';

interface CommentContainerProps {
  comments: CommentType[];
  fixZoneId: number;
}
function CommentContainer({ comments, fixZoneId }: CommentContainerProps) {
  const [{ role }] = useCookies(['role']);
  const [{ token }] = useCookies(['token']);
  const [content, setContent] = useState<string>('');
  const mutation = useNewFixComment(fixZoneId);

  const handleSubmit = () => {
    mutation.mutate({ token, content, fixZoneId });
  };

  const handleChangeMessage = (message: string) => {
    setContent(message);
  };

  const handleKeydownTextArea = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div
        className={cn(
          'flex w-full gap-2 text-sm',
          role === ROLE_TYPE.ROLE_CLUB && 'hidden',
        )}
      >
        <div>
          <Image
            src={Admin}
            width={52}
            height={52}
            alt="admin image"
            className="rounded-full"
          />
        </div>
        <textarea
          onKeyDown={handleKeydownTextArea}
          placeholder="코멘트를 작성해 주세요."
          value={content}
          onChange={(e) => handleChangeMessage(e.target.value)}
          className="h-20 w-full overflow-y-scroll rounded-3xl bg-gray-100 p-4 text-[#878787] outline-none"
        />
        <div
          role="button"
          onClick={handleSubmit}
          className="min-w-fit rounded-3xl bg-blue-500 p-3 font-semibold text-white"
        >
          댓글 작성
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
