'use client';

import {
  Body1,
  Body3,
  Button,
  Caption1,
  Flex,
  Title3,
} from 'ddingdong-design-system';

import { OptimizedImage } from '@/components/common/OptimizedImage';

import { GAME_IMAGES } from '../../_utils/gameImages';

type Props = {
  onShareLink: () => void;
};

export function IntroStepDesktop({ onShareLink }: Props) {
  return (
    <div className="relative min-h-screen w-full pt-5">
      <Flex
        dir="col"
        alignItems="center"
        className="relative z-10 mx-auto min-h-screen w-full max-w-md gap-12"
      >
        <Flex dir="col" alignItems="center" gap={1} className="w-full">
          <Title3
            weight="bold"
            className="font-school-safety text-game-primary text-center text-2xl"
          >
            마리의 마음을 쟁취하라!
          </Title3>
          <Body3 className="font-school-safety text-center text-gray-600">
            동아리 카드 짝 맞추기 게임
          </Body3>
        </Flex>

        <Flex
          dir="col"
          alignItems="center"
          justifyContent="center"
          gap={4}
          className="bg-game-secondary/60 w-full rounded-lg p-4"
        >
          <Body1 weight="bold" className="font-school-safety text-game-primary">
            마루의 러브 스토리 💌
          </Body1>
          <Flex dir="col" alignItems="center" gap={2} className="text-center">
            <Caption1
              className="font-school-safety whitespace-nowrap text-gray-600"
              weight="normal"
            >
              마루의 짝사랑녀 마리. 둘의 인연은 같은 동아리에서 시작되었어요.
            </Caption1>
            <Caption1
              className="font-school-safety whitespace-nowrap text-gray-600"
              weight="normal"
            >
              마리의 마음을 얻으려면 마루가 더욱 표현해야 해요!
            </Caption1>
            <Caption1
              className="font-school-safety whitespace-nowrap text-gray-600"
              weight="normal"
            >
              마루의 연애가 성공할 수 있도록 명지대 여러분이 도와주세요!
            </Caption1>
            <OptimizedImage
              width={200}
              src={GAME_IMAGES.cheer_maru_mari}
              alt="응원하는 마루와 마리"
            />
          </Flex>
        </Flex>

        <Flex dir="col" alignItems="center" gap={1} className="w-full">
          <Title3
            weight="bold"
            className="font-school-safety text-game-primary text-center"
          >
            마루의 사랑을 위해
          </Title3>
          <Title3
            weight="bold"
            className="font-school-safety text-game-primary text-center"
          >
            지금 바로, 게임하고 선물 받아가세요!
          </Title3>
        </Flex>

        <Flex dir="col" alignItems="center" gap={5} className="w-full">
          <div className="flex h-[250px] w-[250px] items-center justify-center rounded-lg bg-gray-200">
            <OptimizedImage
              src={GAME_IMAGES.qr_code}
              alt="게임 링크 QR 코드"
              width={250}
              height={250}
              className="rounded-lg"
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            size="full"
            className="bg-game-secondary w-full max-w-[280px]"
            onClick={onShareLink}
          >
            <Body3
              weight="bold"
              className="font-school-safety text-game-primary"
            >
              게임 링크 공유하기
            </Body3>
          </Button>
        </Flex>

        <div className="pointer-events-none relative mt-auto w-screen">
          <div className="relative flex w-full flex-row pt-30">
            <OptimizedImage
              src={GAME_IMAGES.bridge}
              alt="bridge1"
              className="w-1/2 min-w-0 flex-1 object-contain object-bottom"
              priority
            />
            <OptimizedImage
              src={GAME_IMAGES.bridge}
              alt="bridge2"
              className="w-1/2 min-w-0 flex-1 object-contain object-bottom"
              priority
            />
            <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between px-[8%] pb-[5%]">
              <OptimizedImage
                src={GAME_IMAGES.ride_maru}
                alt="마루"
                className="h-auto w-[28%] max-w-[140px] -scale-x-100 object-contain object-bottom"
                priority
              />
              <OptimizedImage
                src={GAME_IMAGES.heart_mari}
                alt="마리"
                className="h-auto w-[14%] max-w-[70px] -scale-x-100 object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </Flex>
    </div>
  );
}
