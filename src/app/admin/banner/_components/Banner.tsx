'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  IconButton,
  usePortal,
  Flex,
  Switch,
  Caption1,
  Card,
  cn,
} from 'ddingdong-design-system';
import { useMediaQuery } from 'usehooks-ts';

import { Banner as BannerType } from '@/app/_api/types/banner';

import { DeleteModal } from './DeleteModal';

export function Banner({ data }: { data: BannerType }) {
  const { id, webImageUrl, mobileImageUrl } = data;
  const { isOpen, openModal, closeModal } = usePortal();

  const breakPoint = '(min-width: 768px)';
  const isDesktopViewport = useMediaQuery(breakPoint);

  const [isDesktop, setIsDesktop] = useState<boolean>(isDesktopViewport);

  useEffect(() => {
    setIsDesktop(isDesktopViewport);
  }, [isDesktopViewport]);

  return (
    <>
      <Card className={`relative my-4 h-52 ${isDesktopViewport && 'w-full'}`}>
        <img
          src={isDesktop ? webImageUrl.originUrl : mobileImageUrl.originUrl}
          alt={isDesktop ? webImageUrl.fileName : mobileImageUrl.fileName}
          width={1024}
          height={200}
          className="h-[90%] object-scale-down"
        />
        <IconButton
          iconName="trash"
          className="absolute top-2 right-2"
          size={18}
          onClick={openModal}
        />
        <BannerSwitch
          isDesktop={isDesktop}
          isDesktopViewport={isDesktopViewport}
          setIsDesktop={setIsDesktop}
        />
      </Card>
      <DeleteModal id={id} isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

function BannerSwitch({
  isDesktop,
  setIsDesktop,
  isDesktopViewport,
}: {
  isDesktop: boolean;
  setIsDesktop: Dispatch<SetStateAction<boolean>>;
  isDesktopViewport: boolean;
}) {
  return (
    <Flex alignItems="center" gap={2} className="absolute right-2 bottom-2">
      <Caption1
        weight="normal"
        className={cn(
          !isDesktop && 'text-blue-500',
          !isDesktopViewport && 'hidden',
        )}
      >
        Mobile
      </Caption1>
      <Switch checked={isDesktop} onCheckedChange={setIsDesktop} />
      <Caption1 weight="normal" className={`${isDesktop && 'text-blue-500'}`}>
        PC
      </Caption1>
    </Flex>
  );
}
