'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Caption1, Flex } from 'ddingdong-design-system';

import Bin from '@/assets/bin-black.svg';
import Score from '@/assets/score.svg';
import { ModalType } from '@/types';

import DeleteClub from './DeleteClub';
import ModalHeader from './ModalHeader';

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
    <Flex dir="col" alignItems="center" className="w-[80vw] max-w-[500px]">
      <ModalHeader title="동아리 생성하기" onClose={closeModal} />

      <Flex dir="row" className="w-full" justifyContent="center">
        <Link key={id} href={`/club/${id}/score`} className="w-full">
          <Flex
            dir="col"
            alignItems="center"
            justifyContent="center"
            className="w-full"
          >
            <Image
              src={Score}
              alt="동아리 점수"
              width={80}
              height={80}
              className="m-auto"
            />
            <Caption1 className="mt-4 text-gray-700">동아리 점수 수정</Caption1>
          </Flex>
        </Link>

        <Flex
          dir="col"
          alignItems="center"
          justifyContent="center"
          onClick={handleClickDelete}
          className="w-full cursor-pointer border-l-2 border-gray-200 text-gray-700"
        >
          <Image
            src={Bin}
            alt="동아리 삭제"
            width={80}
            height={80}
            className="m-auto"
          />
          <Caption1 className="mt-4 text-gray-700">동아리 삭제</Caption1>
        </Flex>
      </Flex>
    </Flex>
  );
}
