import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCookies } from 'react-cookie';
import Admin from '@/assets/admin.jpg';
import Dot from '@/assets/dot.svg';
import Dropdown from '@/components/common/Dropdown';
import { useDeleteFixComment } from '@/hooks/api/fixzone/useDeleteFixComment';
import { Comment as CommentType } from '@/types/fix';
import 'dayjs/locale/ko';

interface CommentProps {
  info: CommentType;
  fixZoneId: number;
}

function Comment({ info, fixZoneId }: CommentProps) {
  const [{ token }] = useCookies(['token']);

  const { content, createdAt, commentId } = info;
  const deleteMutation = useDeleteFixComment();

  dayjs.locale('ko');
  dayjs.extend(relativeTime);

  const handleClickDeleteButton = () => {
    deleteMutation.mutate({
      fixZonId: fixZoneId,
      commentId: commentId,
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
      <div className="flex w-full justify-between">
        <div>
          <div className="flex gap-2">
            <span className="font-bold">제40대 총동아리연합회 U:th</span>
            <time className="text-gray-500">{dayjs(createdAt).fromNow()}</time>
          </div>
          {content}
        </div>
        <div className="flex flex-col justify-center">
          <Dropdown
            head={
              <Image
                src={Dot}
                width={20}
                height={20}
                alt="더보기 버튼"
                className=""
              />
            }
            list={[
              <div onClick={handleClickDeleteButton} key={0}>
                삭제
              </div>,
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Comment;
