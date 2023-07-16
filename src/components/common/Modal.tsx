import Image from 'next/image';
import CancleImg from '@/assets/cancle.svg';
import ModalPortal from './ModalPortal';

type ModalProps = {
  title: string;
  children: React.ReactNode;
  show: boolean;
  setShowModal: (flag: boolean) => void;
};

export default function Modal({
  children,
  title,
  show,
  setShowModal,
}: ModalProps) {
  return (
    <ModalPortal>
      {/* modal background */}
      <div
        className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center  bg-black bg-opacity-10 ${
          !show && 'hidden'
        }`}
        onClick={() => setShowModal(!show)}
      >
        {/* modal*/}
        <div
          className="z-55 dark:bg- relative max-h-[80%] w-full max-w-lg rounded-lg bg-white shadow"
          onClick={(e) => e.stopPropagation()}
        >
          {/* modalheader */}
          <div className="flex items-center justify-between rounded-t border-b p-5 ">
            <h3 className="text-xl font-bold  text-gray-400 ">{title}</h3>
            <button
              type="button"
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
              data-modal-hide="medium-modal"
              onClick={() => setShowModal(false)}
            >
              <Image src={CancleImg} alt="cancle" />
            </button>
          </div>
          {/* modalbody*/}
          <div className="space-y-6 p-6">{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
}
