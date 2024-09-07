import Image from 'next/image';
import CancelImg from '@/assets/cancel.svg';
import ModalPortal from './ModalPortal';

type ModalProps = {
  visible: boolean;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  closeModal: () => void;
  title?: React.ReactNode;
  closeButton?: boolean;
  feed?: boolean;
};

export default function Modal({
  visible,
  children,
  closeButton = true,
  closeModal,
  modalRef,
  title,
  feed = false,
}: ModalProps) {
  if (!visible) return <></>;

  return (
    <ModalPortal>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-10">
        <div
          className={`z-60 relative m-5  w-full rounded-lg bg-white shadow  ${
            feed
              ? 'max-w-3xl md:h-[70%]'
              : 'max-h-[80%] max-w-lg overflow-y-scroll md:overflow-y-auto'
          }`}
          ref={modalRef}
        >
          <div
            className={`flex items-center justify-between rounded-t ${
              title && `border-b p-5`
            }`}
          >
            <h1
              className={`text-xl font-bold text-gray-400 ${
                !title && 'hidden'
              }`}
            >
              {title}
            </h1>
            <button
              className={`ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 ${
                !closeButton && `hidden`
              } `}
              onClick={closeModal}
            >
              <Image src={CancelImg} alt="close-button" />
            </button>
          </div>
          <div className={`space-y-6  ${!feed && 'p-6'}`}>{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
}
