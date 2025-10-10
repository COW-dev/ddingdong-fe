'use client';

import { useRouter } from 'next/navigation';

import { Button, Flex, DoubleButton } from 'ddingdong-design-system';

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
    <Flex dir="col" alignItems="center" className="max-w-[350px]">
      <ModalHeader title="동아리 관리하기" onClose={closeModal} />

      <div className="flex w-full flex-row items-center justify-between">
        <DoubleButton
          left={
            <Button
              color="blue"
              size="md"
              variant="primary"
              onClick={() => router.push(`/club/${id}/score`)}
            >
              동아리 점수
            </Button>
          }
          right={
            <Button
              color="red"
              size="md"
              variant="secondary"
              onClick={handleClickDelete}
            >
              동아리 삭제
            </Button>
          }
        />
      </div>
    </Flex>
  );
}
