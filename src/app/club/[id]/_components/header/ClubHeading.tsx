'use client';

import { Avatar, Body2, Flex, Title1 } from 'ddingdong-design-system';

import { ClubDetail } from '@/app/_api/types/club';
import Mode from '@/assets/admin.jpg';
import { deptCaptionColor } from '@/constants/color';

type ClubHeadingProps = Pick<
  ClubDetail,
  'profileImage' | 'name' | 'category' | 'tag'
>;

export const ClubHeading = ({
  name,
  category,
  tag,
  profileImage,
}: ClubHeadingProps) => {
  return (
    <Flex dir="col" className="py-7">
      <Flex gap={3}>
        <Flex alignItems="center" className="h-auto object-contain">
          <Avatar
            src={profileImage?.cdnUrl ?? Mode.src}
            alt={name}
            size="lg"
            className="size-20"
          />
        </Flex>
        <Flex dir="col" gap={1}>
          <Title1 weight="bold">{name}</Title1>
          <Flex alignItems="center">
            <Body2 className={`${deptCaptionColor[category]}`}>
              {category}
            </Body2>
            <Body2 weight="normal" className="px-1.5 text-gray-300">
              |
            </Body2>
            <Body2 className="text-gray-500">{tag}</Body2>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
