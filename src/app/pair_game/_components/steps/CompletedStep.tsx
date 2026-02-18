'use client';

import { Body1, Body2, Flex } from 'ddingdong-design-system';

type Props = {
  totalParticipants: number;
};

// todo: api 연동시에 디자인 보완 필요

export function CompletedStep({ totalParticipants }: Props) {
  return (
    <Flex
      dir="col"
      alignItems="center"
      justifyContent="center"
      gap={4}
      className="min-h-screen px-4 py-8"
    >
      <Flex
        dir="col"
        alignItems="center"
        gap={4}
        className="w-full max-w-md rounded-lg bg-pink-50 px-6 py-8"
      >
        <Body1 weight="bold" className="font-school-safety text-center text-2xl">
          응모가 완료되었습니다! 🎉
        </Body1>
        <Body2 className="font-school-safety text-center text-[#1F2937]">
          현재까지 {totalParticipants}명이 응모했어요.
        </Body2>
      </Flex>
    </Flex>
  );
}
