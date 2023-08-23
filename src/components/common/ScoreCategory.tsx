import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/common/Modal';
import CreateScore from '@/components/modal/score/CreateScore';
import useModal from '@/hooks/common/useModal';
import { ModalType } from '@/types';
type ScoreProps = {
  scoreCategory: string;
  icon: string;
  amount: number;
  clubId: number;
};
export default function ScoreCategory({
  scoreCategory,
  icon,
  amount,
  clubId,
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
    <div
      className=" mb-5 flex h-full w-full flex-row justify-between rounded-lg border-2 shadow-md md:max-w-[18%] "
      onClick={() =>
        handleModal({
          title: scoreCategory,
          content: (
            <CreateScore
              clubId={clubId}
              scoreCategory={scoreCategory}
              closeModal={closeModal}
            />
          ),
        })
      }
    >
      <Image
        src={icon}
        width={50}
        height={50}
        alt="이미지"
        className="ml-4 md:mb-auto md:mt-2"
      />
      <div className="mx-1 mr-2 flex w-36 flex-col text-right md:mb-5 md:justify-end ">
        <span className="mr-2 text-sm font-bold text-purple-500 md:text-xl">
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
