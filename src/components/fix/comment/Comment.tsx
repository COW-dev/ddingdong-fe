import Image from 'next/image';
import Admin from '@/assets/admin.jpg';

function Comment() {
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
          <time className="text-gray-500">4분 전</time>
        </div>
        그 부분은 시설보수가 어려운뎅,,,,
      </div>
    </div>
  );
}

export default Comment;
