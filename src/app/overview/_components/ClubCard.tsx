'use client';

import Link from 'next/link';

import { Badge, Body1, Caption1, Card, Flex } from 'ddingdong-design-system';

import { deptCaptionColor } from '@/constants/color';

type ClubCardProps = {
  id: number;
  name: string;
  tag: string;
  category: string;
  recruitStatus: string;
};

export function ClubCard({
  id,
  name,
  tag,
  category,
  recruitStatus,
}: ClubCardProps) {
  return (
    <Card as="li">
      <Link
        href={`/club/${id}`}
        className="flex h-full w-full cursor-pointer justify-between"
      >
        <Flex dir="col">
          <Body1 weight="bold">{name}</Body1>
          <Flex alignItems="center" className="h-auto">
            <Caption1 className={`${deptCaptionColor[category]}`}>
              {category}
            </Caption1>
            <Caption1 className="px-1 text-gray-300">|</Caption1>
            <Caption1 className="text-gray-400">{tag}</Caption1>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Badge
            variant={recruitStatus === '모집 중' ? 'positive' : 'neutral'}
            text={recruitStatus}
          />
        </Flex>
      </Link>
    </Card>
  );
}
