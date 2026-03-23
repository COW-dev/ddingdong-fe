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
} from '@dds/shared';
import { useMediaQuery } from 'usehooks-ts';

import { OptimizedImage } from '@/_components/common/OptimizedImage';

import { Banner as BannerType } from '../../../_api/types/banner';

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
        <OptimizedImage
          src={isDesktop ? webImageUrl.cdnUrl : mobileImageUrl.cdnUrl}
          alt={
            isDesktop
              ? (webImageUrl?.fileName ?? '')
              : (mobileImageUrl?.fileName ?? '')
          }
          width={1024}
          height={200}
          className="h-[90%] object-scale-down"
        />
        <IconButton
          iconName="trash"
          className="absolute right-2 top-2"
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
    <Flex alignItems="center" gap={2} className="absolute bottom-2 right-2">
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
