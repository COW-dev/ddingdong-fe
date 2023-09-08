import { useEffect } from 'react';
import Image from 'next/image';
import errorImage from '@/assets/error-image.png';
import useModal from '@/hooks/common/useModal';
import Modal from '../common/Modal';
export default function ReportNoticeModal() {
  const { visible, toggleModal, closeModal, modalRef } = useModal();

  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem('reportNoticeModalShown');
    if (!hasModalBeenShown) {
      toggleModal();
      localStorage.setItem('reportNoticeModalShown', 'true');
    }
  }, [toggleModal]);

  return (
    <Modal visible={visible} modalRef={modalRef} closeModal={closeModal}>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={errorImage}
          width={100}
          height={100}
          priority
          alt="noticeImage"
        />
        <div className="mt-14 w-full text-center">
          <div>
            동아리 회장님들의 편의를 위해 <br />
            학번 및 학과를 자동으로 기입해주는 기능을 업데이트 할 예정입니다.
          </div>
          <br />
          <div>
            따라서 동아리원 작성 기능 생성 이전까지, <br />
            <strong> 학번 및 학과가 임의로 설정</strong>되어져있으므로 착오
            없으시길 바랍니다.
          </div>
        </div>
      </div>
    </Modal>
  );
}
