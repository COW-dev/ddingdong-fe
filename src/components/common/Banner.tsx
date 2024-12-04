import Image from 'next/image';
import toast from 'react-hot-toast';
import Bin from '@/assets/bin-black.svg';
import useModal from '@/hooks/common/useModal';
import { BannerType } from '@/types/banner';
import Modal from './Modal';
import DeleteBanner from '../modal/banner/DeleteBanner';

type BannerProps = {
  data: BannerType;
};

export default function Banner({ data }: BannerProps) {
  const { id, link, webImageUrl, mobileImageUrl } = data;
  const { openModal, visible, closeModal, modalRef } = useModal();

  return (
    <>
      <div className="relative my-4 flex min-w-fit flex-col justify-center">
        <Image
          className="absolute right-2 top-2 cursor-pointer rounded-md bg-white p-2 opacity-80 hover:opacity-100"
          src={Bin}
          alt={'휴지통 이미지'}
          width={32}
          height={32}
          onClick={openModal}
        />
        <Image src={webImageUrl.originUrl} alt={''} width={1024} height={400} />
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title={'배너 삭제하기'}
        closeModal={closeModal}
      >
        <DeleteBanner id={id} closeModal={closeModal} />
      </Modal>
    </>
  );
}
