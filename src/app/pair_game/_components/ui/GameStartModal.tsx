'use client';

import { Button, Flex, Modal, IconButton } from 'ddingdong-design-system';

import { OptimizedImage } from '@/components/common/OptimizedImage';

import maruMariImage from '../../Img/maru_mari.webp';

import { Body1, Title2, Body2 } from './EventTypography';

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  onGameStart: VoidFunction;
};

export function GameStartModal({ isOpen, onClose, onGameStart }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={onClose}
      closeOnOutsideClick={false}
      contentClassName="
  bg-[radial-gradient(circle_at_center,rgba(255,80,125,0)_0%,rgba(255,80,125,0.15)_60%,rgba(255,80,125,0.3)_100%)]"
    >
      <Flex
        alignItems="center"
        dir="col"
        justifyContent="center"
        gap={4}
        className="d:min-w-[500px] relative w-full max-w-[350px] min-w-[300px]"
      >
        <Flex
          alignItems="center"
          justifyContent="between"
          className="z-10 w-full"
        >
          <div className="w-[24px]" />

          <div className="flex-1 text-center">
            <Title2 className="text-game-primary">
              마리의 마음을 쟁취하라!
            </Title2>
            <Body2 className="text-[#1F2937]">
              동아리 카드 짝 맞추기 게임 도전!
            </Body2>
          </div>

          <IconButton
            color="gray"
            iconName="close"
            className="-translate-y-2"
            onClick={onClose}
          />
        </Flex>

        <div className="min-h-[200px] w-full" aria-hidden />
        <OptimizedImage
          src={maruMariImage.src}
          alt="마루와 마리"
          className="absolute top-3/5 left-1/2 z-0 w-full max-w-[280px] -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <Button
          size="full"
          variant="primary"
          className="bg-game-primary relative z-10"
          onClick={onGameStart}
        >
          <Body1 weight="bold" className="text-white">
            게임하고 상품 받기
          </Body1>
        </Button>
      </Flex>
    </Modal>
  );
}
