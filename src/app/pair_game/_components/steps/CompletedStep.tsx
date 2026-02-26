'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { Body1, Body2, Button, Caption1, Flex } from 'ddingdong-design-system';
import JSConfetti from 'js-confetti';

import { OptimizedImage } from '@/components/common/OptimizedImage';

import { useGameLayoutBg } from '../../_hooks/useGameLayoutBg';
import { GAME_IMAGES } from '../../_utils/gameImages';
import { shareCurrentLink } from '../../_utils/shareLink';
const CONFETTI_COLORS = [
  '#ff0a54',
  '#ff477e',
  '#ff7096',
  '#f9bec7',
  '#FFA500',
  '#FF8C42',
  '#FFB347',
  '#FFD700',
  '#FFEC8B',
  '#FFFACD',
];

type Props = {
  totalParticipants: number;
};

export function CompletedStep({ totalParticipants }: Props) {
  const router = useRouter();

  useGameLayoutBg();

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: CONFETTI_COLORS,
      confettiRadius: 3,
    });
    return () => {
      jsConfetti.clearCanvas();
    };
  }, []);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Flex
      dir="col"
      alignItems="center"
      justifyContent="start"
      gap={6}
      className="w-full pb-30"
    >
      <OptimizedImage
        src={GAME_IMAGES.check_maru_mari}
        alt="응모 완료 마루마리"
        width={220}
        height={220}
        priority
        className="w-[160px] md:w-[100px]"
      />

      <Flex dir="col" alignItems="center" gap={2} className="text-center">
        <Body1
          weight="bold"
          className="font-school-safety text-game-primary text-2xl md:text-3xl"
        >
          응모가 완료되었어요!
        </Body1>
        <Caption1 className="text-gray-300">
          마루가 준비한 선물 응모가 정상적으로 접수되었어요
        </Caption1>
      </Flex>

      <div className="bg-game-tertiary border-game-secondary w-full max-w-sm rounded-lg border py-4 text-center">
        <Body2 className="text-gray-700">
          현재까지{' '}
          <Body2 as="span" className="text-game-primary font-bold">
            {totalParticipants}
          </Body2>
          명이 응모했어요!
        </Body2>
      </div>

      <Flex
        dir="col"
        gap={3}
        className="fixed bottom-3 mt-auto w-full max-w-md px-6"
      >
        <Button
          type="button"
          variant="primary"
          size="full"
          className="bg-game-primary py-3"
          onClick={handleGoHome}
        >
          <Body2 weight="bold">홈으로 이동하기</Body2>
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="full"
          className="bg-game-secondary py-3"
          onClick={shareCurrentLink}
        >
          <Body2 weight="bold" className="text-game-primary">
            게임 링크 공유하기
          </Body2>
        </Button>
      </Flex>
    </Flex>
  );
}
