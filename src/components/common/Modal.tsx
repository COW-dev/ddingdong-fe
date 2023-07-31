import Image from 'next/image';
import CancleImg from '@/assets/cancle.svg';
import ModalPortal from './ModalPortal';
type Props = {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  closeModal: () => void;
};

export default function Modal({
  visible,
  children,
  closeModal,
  modalRef,
  title,
}: Props) {
  if (!visible) return <></>;

  return (
    <ModalPortal>
      <div
        className={`fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center  bg-black bg-opacity-10   `}
      >
        <div
          className="z-55 dark:bg- relative max-h-[80%] w-full max-w-lg  overflow-y-scroll  overscroll-y-contain rounded-lg  bg-white shadow md:overflow-y-auto"
          ref={modalRef}
        >
          <div className="flex items-center justify-between rounded-t  border-b p-5 ">
            <h3 className="text-xl font-bold  text-gray-400 ">{title}</h3>
            <button
              type="button"
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
              data-modal-hide="medium-modal"
              onClick={closeModal}
            >
              <Image src={CancleImg} alt="cancle" />
            </button>
          </div>
          <div className="space-y-6 p-6 "> {children}</div>
        </div>
      </div>
    </ModalPortal>
  );
}
