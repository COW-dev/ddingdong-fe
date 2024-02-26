import Image from 'next/image';
import Npay from '@/assets/npay.svg';
import useModal from '@/hooks/common/useModal';
import DrawMessage from './DrawMessge';
import DrawForm from './DrwaForm';
import Modal from '../common/Modal';

type Props = {
  completed: boolean;
};

export default function DrawFooter({ completed }: Props) {
  const { openModal, visible, closeModal, modalRef } = useModal();
  const drawTitle = (
    <div className="text-[96%] font-semibold">
      <span className="mr-2 text-pink-400 ">THE CLUB 시즌즈</span>
      <span className=" text-gray-700">동아리 박람회 응모</span>
    </div>
  );
  function handleOpenModal() {
    openModal();
  }

  return (
    <>
      <div className="mt-5 flex flex-col items-center text-xl">
        <div className="mt-4 flex flex-row items-center justify-center">
          <Image src={Npay} width={130} height={100} alt={'네이버페이'} />
          <div className="ml-2 flex flex-col text-[85%] font-bold">
            <span className="font-semibold text-pink-400">추첨경품</span>
            <span className="">네이버페이</span>
            <span className="">1만원(100명)</span>
          </div>
        </div>
        <DrawMessage completed={completed} />
        <button
          onClick={() => handleOpenModal()}
          //   disabled={!completed}
          className={`mt-4 h-10 w-22 rounded-lg text-sm font-semibold transition-colors md:mt-8 md:h-12 md:w-48 md:text-lg ${
            completed
              ? ' bg-pink-400 text-white '
              : 'cursor-not-allowed bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          응모하기
        </button>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={drawTitle}
        closeModal={closeModal}
      >
        <DrawForm closeModal={closeModal} />
      </Modal>
    </>
  );
}
