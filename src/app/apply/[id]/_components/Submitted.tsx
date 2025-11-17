'use client';

import { useEffect } from 'react';

import { Body1, Button, Flex, Title1 } from 'ddingdong-design-system';
import JSConfetti from 'js-confetti';
import { useRouter } from 'next/navigation';

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

type SubmittedProps = {
  applicationCount: number;
  clubName: string;
};

export function Submitted({ applicationCount, clubName }: SubmittedProps) {
  const router = useRouter();

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: CONFETTI_COLORS,
      confettiRadius: 3,
    });
  }, []);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <Flex
      dir="col"
      alignItems="center"
      justifyContent="center"
      className="max-h-dvh w-full pt-32"
    >
      <div className="p-10 py-5">
        <div className="flex size-[70px] items-center justify-center rounded-full bg-green-500">
          <span className="text-4xl text-white">✓</span>
        </div>
      </div>
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-full py-2 text-center"
      >
        <Title1 className="text-4xl font-bold text-gray-700">
          지원서 제출이 완료되었습니다!
        </Title1>
        <Flex dir="col" gap={2} className="w-1/2 text-gray-600">
          <Body1 weight="medium">{clubName}에 지원해주셔서 감사합니다!</Body1>
          <Body1 weight="medium">
            현재까지 {clubName} 지원자는 {(applicationCount ?? 0) + 1}명입니다.
          </Body1>
        </Flex>
        <Button
          variant="primary"
          color="blue"
          size="lg"
          className="mt-3 px-8 py-3"
          onClick={handleGoHome}
        >
          홈 화면으로 이동하기
        </Button>
      </Flex>
    </Flex>
  );
}
