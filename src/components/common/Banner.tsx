'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';

import { useMediaQuery } from 'usehooks-ts';

import Bin from '@/assets/bin-black.svg';
import { Switch } from '@/components/ui/switch';
import useModal from '@/hooks/common/useModal';
import { BannerType } from '@/types/banner';

import DeleteBanner from '../modal/banner/DeleteBanner';

import Modal from './Modal';

type BannerProps = {
  data: BannerType;
  showEdit?: boolean;
};

export default function Banner({ data, showEdit = false }: BannerProps) {
  const { id, webImageUrl, mobileImageUrl } = data;
  const { openModal, visible, closeModal, modalRef } = useModal();

  const breakPoint = '(min-width: 768px)';
  const isDesktopViewport = useMediaQuery(breakPoint);

  const [isDesktop, setIsDesktop] = useState<boolean>(isDesktopViewport);

  useEffect(() => {
    setIsDesktop(isDesktopViewport);
  }, [isDesktopViewport]);
  return (
    <>
      <div
        className={`relative my-4 flex h-52 flex-col justify-center rounded-md  ${
          isDesktopViewport && 'w-full'
        } ${showEdit && 'border border-gray-100'}`}
      >
        <Image
          src={isDesktop ? webImageUrl.originUrl : mobileImageUrl.originUrl}
          alt="banner-image"
          width={1024}
          height={200}
          className="h-[90%] object-scale-down"
        />
        <div className={showEdit ? 'block' : 'hidden'}>
          <Image
            className="absolute right-2 top-2 cursor-pointer rounded-md bg-white p-2 opacity-80 hover:opacity-100"
            src={Bin}
            alt="휴지통 이미지"
            width={32}
            height={32}
            onClick={openModal}
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-2 text-sm">
            <span
              className={`${!isDesktop && 'text-blue-500'} ${
                !isDesktopViewport && 'hidden'
              }`}
            >
              Mobile
            </span>
            <Switch
              checked={isDesktop}
              onCheckedChange={setIsDesktop}
              className="bg-gray-200"
            />
            <span className={`${isDesktop && 'text-blue-500'}`}>PC</span>
          </div>
        </div>
      </div>
      <Modal
        visible={visible}
        modalRef={modalRef}
        title="배너 삭제하기"
        closeModal={closeModal}
      >
        <DeleteBanner id={id} closeModal={closeModal} />
      </Modal>
    </>
  );
}
