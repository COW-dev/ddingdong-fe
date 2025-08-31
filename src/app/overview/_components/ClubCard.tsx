'use client';

import Link from 'next/link';

import { Badge, Body1, Caption1, Card, Flex } from 'ddingdong-design-system';

import { Club } from '@/app/_api/types/club';
import { deptCaptionColor } from '@/constants/color';

const badgeVariantByStatus: Record<
  Club['recruitStatus'],
  'positive' | 'neutral'
> = {
  '모집 중': 'positive',
  '모집 마감': 'neutral',
  '모집 예정': 'neutral',
};

export function ClubCard({ id, name, tag, category, recruitStatus }: Club) {
  return (
    <Card as="li">
      <Link
        href={`/club/${id}`}
        aria-label={`${name} 동아리 상세 보기`}
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
            variant={badgeVariantByStatus[recruitStatus]}
            text={recruitStatus}
          />
        </Flex>
      </Link>
    </Card>
  );
}
