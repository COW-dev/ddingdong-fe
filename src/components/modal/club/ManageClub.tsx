import Image from 'next/image';
import Link from 'next/link';
import Bin from '@/assets/bin.svg';
import Score from '@/assets/score.svg';
import { ModalType } from '@/types';
import DeleteClub from './DeleteClub';

type Prop = {
  id: number;
  score: number;
  name: string;
  closeModal: () => void;
  handleModal: ({ title, content }: ModalType) => void;
};

export default function ManageClub({
  id,
  name,
  closeModal,
  handleModal,
}: Prop) {
  function handleClickDelete() {
    handleModal({
      title: '동아리 삭제하기',
      content: <DeleteClub id={id} name={name} closeModal={closeModal} />,
    });
  }
  return (
    <div className="flex h-36 w-full items-center space-x-2">
      <Link key={id} href={`/club/${id}/score`} className="w-full">
        <div className=" flex w-full flex-col items-center ">
          <Image
            src={Score}
            alt="동아리 점수"
            width={100}
            height={100}
            className=" m-auto"
          />
          <span className="mt-2 text-xl font-bold text-gray-700">
            동아리 점수 수정하기
          </span>
        </div>
      </Link>
      <div
        className=" flex w-full cursor-pointer flex-col items-center border-l-2 border-gray-300 text-gray-700"
        onClick={handleClickDelete}
      >
        <Image
          src={Bin}
          alt="동아리 삭제"
          width={100}
          height={100}
          className=" m-auto"
        />
        <span className="mt-2 text-xl font-bold">동아리 삭제 하기</span>
      </div>
    </div>
  );
}

{
  /* <Link key={club.id} href={`/club/${club.id}/score`}>
<ModifyClub
    id={club.id}
    score={club.score}
    name={club.name}
    closeModal={closeModal}
    handleModal={handleModal}
    /> */
}
