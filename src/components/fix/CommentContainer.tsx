import Image from 'next/image';
import Admin from '@/assets/admin.jpg';
function CommentContainer() {
  const handleClickSendButton = () => {};

  return (
    <>
      <div className="flex w-full gap-2">
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
          className="min-w-fit rounded-3xl bg-blue-500 p-3 text-sm font-semibold text-white"
        >
          댓글 작성
        </div>
      </div>
    </>
  );
}

export default CommentContainer;
