import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/common/Modal';
import CreateScore from '@/components/modal/score/CreateScore';
import useModal from '@/hooks/common/useModal';
import { ModalType } from '@/types';
import { ScoreDetail } from '@/types/score';
type ScoreProps = {
  scoreCategory: string;
  icon: string;
  parseList: ScoreDetail[];
  amount: number;
};
export default function ScoreClubCategory({
  scoreCategory,
  icon,
  amount,
  parseList,
}: ScoreProps) {
  const { openModal, visible, closeModal, modalRef } = useModal();
  const [modal, setModal] = useState<ModalType>({
    title: '',
    content: <></>,
  });
  function handleModal(data: ModalType) {
    setModal(data);
    openModal();
  }
  return (
    <div className="mb-5 flex h-20 w-full cursor-pointer justify-between rounded-lg border-2 shadow-md md:mb-0 md:h-full md:max-w-[18%] lg:flex-row ">
      <Image
        src={icon}
        width={50}
        height={50}
        alt="이미지"
        className="mb-2 ml-4 md:mb-auto md:mt-2"
      />
      <div className="my-2 mb-2 flex w-36 flex-col justify-end text-right md:mx-1 md:mb-5  ">
        <span className=" text-md mr-2 font-bold text-purple-500 lg:text-xl">
          {scoreCategory}
        </span>
        <span className="text-md mr-2 font-bold md:text-xl">{amount}점</span>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={modal.title}
        closeModal={closeModal}
      >
        {modal.content}
      </Modal>
    </div>
  );
}
