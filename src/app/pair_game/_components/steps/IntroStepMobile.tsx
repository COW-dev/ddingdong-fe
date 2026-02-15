'use client';

import Link from 'next/link';

import { Button, Flex, Caption1 } from 'ddingdong-design-system';

import { BridgeMaruMari } from '../ui/BridgeMaruMari';
import { Body3, Caption2, Title3 } from '../ui/EventTypography';

type Props = {
  onGameStart: () => void;
  onShareLink: () => void;
};

export function IntroStepMobile({ onGameStart, onShareLink }: Props) {
  return (
    <Flex
      dir="col"
      alignItems="center"
      gap={6}
      className="mx-auto min-h-screen w-full max-w-md px-4 py-0"
    >
      <Flex dir="row" justifyContent="end" className="w-full">
        <Link href="/pair_game/guide">
          <Caption1 className="text-gray-600">안내</Caption1>
        </Link>
      </Flex>

      <Flex
        dir="col"
        alignItems="center"
        justifyContent="center"
        gap={2}
        className="bg-game-secondary/60 w-full rounded-lg py-5"
      >
        <Title3
          weight="bold"
          className="text-game-primary text-center text-2xl"
        >
          마리의 마음을 쟁취하라!
        </Title3>
        <Body3 className="text-center text-gray-600">
          동아리 카드 짝 맞추기 게임
        </Body3>
      </Flex>

      <Flex
        dir="col"
        gap={6}
        className="bg-game-secondary/60 w-full rounded-lg px-6 py-4"
      >
        <Flex dir="col" gap={2}>
          <Flex dir="row" alignItems="center" gap={2}>
            <Caption2 weight="bold" className="text-gray-600">
              마루의 러브 스토리
            </Caption2>
            <span className="text-game-primary">💌</span>
          </Flex>
          <Flex dir="col" gap={2}>
            <Caption2 className="text-gray-600" weight={400}>
              마루의 짝사랑녀 마리. 둘의 인연은 같은 동아리에서 시작되었어요.
            </Caption2>
            <Caption2 className="text-gray-600" weight={400}>
              마리의 마음을 얻으려면 마루가 더욱 표현해야 해요!
            </Caption2>
            <Caption2 className="text-gray-600" weight={400}>
              마루의 연애가 성공할 수 있도록 명지대 여러분이 도와주세요!
            </Caption2>
          </Flex>
        </Flex>

        <Flex dir="col" gap={2}>
          <Flex dir="row" alignItems="center" gap={2}>
            <Caption2 weight="bold" className="text-gray-600">
              플레이 방법
            </Caption2>
            <span>🃏</span>
          </Flex>
          <Flex dir="col" gap={2}>
            <Caption2 className="text-gray-600" weight={400}>
              <span className="text-game-primary">같은 동아리 카드의 짝</span>을
              맞춰주세요.
            </Caption2>
            <Caption2 className="text-gray-600" weight={400}>
              단계가 올라갈수록 마리의 마음을 사로잡을 수 있어요.
            </Caption2>
            <Caption2 className="text-gray-600" weight={400}>
              5개 단계를 모두 클리어하면
              <span className="text-game-primary">
                특별한 결말과 상품 응모 기회
              </span>
              까지! 🎁
            </Caption2>
            <Caption2 className="text-gray-600" weight={400}>
              과연 마루는 그녀의 마음을 사로잡을 수 있을까요?
            </Caption2>
          </Flex>
        </Flex>
      </Flex>

      <Flex dir="col" gap={2} className="w-full">
        <Button
          variant="primary"
          size="full"
          onClick={onGameStart}
          className="bg-game-primary py-3"
        >
          <Caption2 weight="bold">마루 도와주기</Caption2>
        </Button>
        <Link
          href="/pair_game/prize"
          className="bg-game-secondary flex w-full items-center justify-center rounded-lg py-3"
        >
          <Caption2 className="text-game-primary">상품 안내</Caption2>
        </Link>
        <button
          type="button"
          onClick={onShareLink}
          className="pt-2 text-center text-gray-400 underline"
        >
          <Caption1>링크 공유</Caption1>
        </button>
      </Flex>

      <BridgeMaruMari className="relative bottom-0 mt-auto w-screen" />
    </Flex>
  );
}
