'use client';

import { Button, Flex, Modal, IconButton } from 'ddingdong-design-system';

import { OptimizedImage } from '@/components/common/OptimizedImage';

const maruMariImageSrc = '/pair_game/maru_mari.webp';

import { EventBody1, EventTitle2, EventBody2 } from './EventTypography';

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
        className="relative w-full max-w-[520px] min-w-[300px]"
      >
        <Flex
          alignItems="center"
          justifyContent="between"
          className="z-10 w-full"
        >
          <div className="w-[24px]" />

          <div className="flex-1 text-center">
            <EventTitle2 className="text-game-primary whitespace-nowrap">
              마리의 마음을 쟁취하라!
            </EventTitle2>
            <EventBody2 className="text-[#1F2937]">
              동아리 카드 짝 맞추기 게임 도전!
            </EventBody2>
          </div>

          <IconButton
            color="gray"
            iconName="close"
            className="translate-x-5 -translate-y-7"
            onClick={onClose}
          />
        </Flex>

        <div className="min-h-[200px] w-full" aria-hidden />
        <OptimizedImage
          src={maruMariImageSrc}
          alt="마루와 마리"
          className="absolute top-3/5 left-1/2 z-0 w-full max-w-[280px] -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <Button
          size="full"
          variant="primary"
          className="bg-game-primary relative z-10"
          onClick={onGameStart}
        >
          <EventBody1 weight="bold" className="text-white">
            게임하고 상품 받기
          </EventBody1>
        </Button>
      </Flex>
    </Modal>
  );
}
