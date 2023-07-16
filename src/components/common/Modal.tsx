import Image from 'next/image';
import CancleImg from '@/assets/cancle.svg';
import { AdminClub } from '@/types';
import ModalPortal from './ModalPortal';
import { MODAL_TYPE, ModalType } from '../modal';

type ModalProps = {
  modal: ModalType;
  data: AdminClub;
  setModal: (flag: ModalType) => void;
};

export default function Modal({ modal, data, setModal }: ModalProps) {
  if (modal === MODAL_TYPE.null) return <></>;
  const Element = modal.content;

  return (
    <ModalPortal>
      <div
        className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center  bg-black bg-opacity-10 
        ${!modal && 'hidden'}
        `}
        onClick={() => setModal(MODAL_TYPE.null)}
      >
        <div
          className="z-55 dark:bg- relative max-h-[80%] w-full max-w-lg rounded-lg bg-white shadow"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between rounded-t border-b p-5 ">
            <h3 className="text-xl font-bold  text-gray-400 ">{modal.title}</h3>
            <button
              type="button"
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
              data-modal-hide="medium-modal"
              onClick={() => setModal(MODAL_TYPE.null)}
            >
              <Image src={CancleImg} alt="cancle" />
            </button>
          </div>
          <div className="space-y-6 p-6">
            <Element data={data} setModal={setModal} />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
