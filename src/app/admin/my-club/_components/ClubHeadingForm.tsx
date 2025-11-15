'use client';
import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';

import { Body2, Flex, Input, Title1 } from 'ddingdong-design-system';

import { ClubDetail } from '@/app/_api/types/club';
import { ClubHeading } from '@/app/club/[id]/_components/header/ClubHeading';
import { deptCaptionColor } from '@/constants/color';

import AvatarUpload from './AvatarUpload';

type Props = {
  isEditing: boolean;
  setClub: Dispatch<SetStateAction<ClubDetail>>;
  club: ClubDetail;
  onReset: (name: string) => void;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export default function AdminClubHeading({
  club,
  isEditing,
  setClub,
  onReset,
  onChange,
}: Props) {
  const { name: clubName, category, profileImage, tag } = club;
  if (!isEditing) {
    return (
      <ClubHeading
        name={clubName}
        category={category}
        tag={tag}
        profileImage={profileImage}
      />
    );
  }

  return (
    <Flex alignItems="center" gap={3} className="relative py-7">
      <AvatarUpload profileImage={profileImage} setClub={setClub} />
      <div>
        <Title1 weight="bold">{clubName}</Title1>
        <Flex alignItems="center">
          <Body2 className={`${deptCaptionColor[category]}`}>{category}</Body2>
          <Body2 weight="normal" className="px-1.5 text-gray-300">
            |
          </Body2>
          <div className="w-24 md:w-2/3">
            <Input
              onClickReset={() => onReset('tag')}
              name="tag"
              value={tag}
              onChange={onChange}
            />
          </div>
        </Flex>
      </div>
    </Flex>
  );
}
