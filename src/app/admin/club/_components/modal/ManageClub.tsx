'use client';

import { useRouter } from 'next/navigation';

import { Flex, Body3, Icon } from 'ddingdong-design-system';

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
  const router = useRouter();

  function handleClickDelete() {
    handleModal({
      title: '동아리 삭제하기',
      content: <DeleteClub id={id} name={name} closeModal={closeModal} />,
    });
  }

  return (
    <Flex dir="col" alignItems="center" className="min-w-[350px]">
      <ModalHeader title="동아리 관리하기" onClose={closeModal} />

      <Flex
        dir="row"
        alignItems="center"
        justifyContent="between"
        className="w-full py-4"
      >
        <Flex
          dir="col"
          alignItems="center"
          gap={2}
          className="w-full cursor-pointer"
          onClick={() => router.push(`/club/${id}/score`)}
        >
          <Icon name="score" size={50} />
          <Body3>동아리 점수 수정</Body3>
        </Flex>

        <Flex
          dir="col"
          alignItems="center"
          gap={2}
          className="w-full cursor-pointer"
          onClick={handleClickDelete}
        >
          <Icon name="trash" size={50} />
          <Body3>동아리 삭제</Body3>
        </Flex>
      </Flex>
    </Flex>
  );
}
