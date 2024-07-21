import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import CancleImg from '@/assets/cancel.svg';
import ModalPortal from './ModalPortal';
import { cn } from '../ui/utils';
type ModalProps = {
  visible: boolean;
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
  closeModal: () => void;
  title?: React.ReactNode;
  closeButton?: boolean;
};

export default function Modal({
  visible,
  children,
  closeButton = true,
  closeModal,
  modalRef,
  title,
}: ModalProps) {
  if (!visible) return <></>;

  return (
    <ModalPortal>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-10">
        <div
          className="z-60 relative m-5 max-h-[80%] w-full max-w-lg overflow-y-scroll overscroll-y-contain rounded-lg bg-white shadow md:overflow-y-auto"
          ref={modalRef}
        >
          <div
            className={twMerge(
              'flex items-center justify-between rounded-t',
              title ? `border-b p-5` : 'p-2',
            )}
          >
            <h1
              className={cn(
                'text-xl font-bold text-gray-400',
                !title && 'hidden',
              )}
            >
              {title}
            </h1>
            <button
              className={twMerge(
                'ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400',
                'hover:bg-gray-200 hover:text-gray-900',
                !closeButton && `hidden`,
              )}
              onClick={closeModal}
            >
              <Image src={CancleImg} alt="close-button" />
            </button>
          </div>
          <div className="space-y-6 p-6">{children}</div>
        </div>
      </div>
    </ModalPortal>
  );
}
