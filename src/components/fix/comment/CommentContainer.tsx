import Image from 'next/image';
import Admin from '@/assets/admin.jpg';
import Comment from './Comment';
function CommentContainer() {
  const handleClickSendButton = () => {};

  return (
    <>
      <div className="flex w-full gap-2 text-sm">
        <Image
          src={Admin}
          width={40}
          height={40}
          alt="admin image"
          className="rounded-full"
        />
        <input
          placeholder="코멘트를 작성해 주세요."
          className="w-full rounded-3xl bg-gray-100 px-4 text-[#878787] outline-none"
        />
        <div
          onClick={handleClickSendButton}
          role="button"
          className="min-w-fit rounded-3xl bg-blue-500 p-3 font-semibold text-white"
        >
          댓글 작성
        </div>
      </div>
      <div className="flex flex-col gap-2 py-6 text-sm">
        {[1, 2].map((comment, index) => (
          <Comment key={index} />
        ))}
      </div>
    </>
  );
}

export default CommentContainer;
