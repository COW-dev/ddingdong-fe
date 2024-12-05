import { useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'usehooks-ts';
import Bin from '@/assets/bin-black.svg';
import { Switch } from '@/components/ui/switch';
import { ROLE_TYPE } from '@/constants/text';
import useModal from '@/hooks/common/useModal';
import { BannerType } from '@/types/banner';
import Modal from './Modal';
import DeleteBanner from '../modal/banner/DeleteBanner';

type BannerProps = {
  data: BannerType;
};

export default function Banner({ data }: BannerProps) {
  const [{ role }] = useCookies(['role']);

  const { id, link, webImageUrl, mobileImageUrl } = data;
  const { openModal, visible, closeModal, modalRef } = useModal();

  const breakPoint = '(min-width: 700px)';
  const isDesktopViewport = useMediaQuery(breakPoint);

  const [isDesktop, setIsDesktop] = useState<boolean>(isDesktopViewport);

  return (
    <>
      <div className="relative my-4 flex min-w-fit flex-col justify-center">
        <Image
          src={isDesktop ? webImageUrl.originUrl : mobileImageUrl.originUrl}
          alt={'web_banner_image'}
          width={1024}
          height={200}
          className="max-h-40 object-scale-down"
        />
        <div className={`${role !== ROLE_TYPE.ROLE_ADMIN && 'hidden'}`}>
          <Image
            className="absolute right-2 top-2 cursor-pointer rounded-md bg-white p-2 opacity-80 hover:opacity-100"
            src={Bin}
            alt={'휴지통 이미지'}
            width={32}
            height={32}
            onClick={openModal}
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-2 text-sm">
            <span>Mobile</span>
            <Switch
              checked={isDesktop}
              onCheckedChange={setIsDesktop}
              className="bg-gray-200"
            />
            <span>PC</span>
          </div>
        </div>
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
