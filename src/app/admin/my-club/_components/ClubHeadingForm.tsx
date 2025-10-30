'use client';
import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { deptCaptionColor } from '@/constants/color';
import { ClubDetail } from '@/app/_api/types/club';
import { Body2, Flex, Input, Title1 } from 'ddingdong-design-system';
import { ClubHeading } from '@/app/club/[id]/_components/ClubHeading';
import AvatarUpload from './AvatarUpload';

type AdminClubHeadingProps = {
  isEditing: boolean;
  setClub: Dispatch<SetStateAction<ClubDetail>>;
  club: ClubDetail;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export default function AdminClubHeading({
  club,
  isEditing,
  setClub,
  onChange,
}: AdminClubHeadingProps) {
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
    <>
      <Flex alignItems="center" gap={3} className="relative py-7">
        <AvatarUpload
          isEditing={isEditing}
          profileImage={profileImage}
          setClub={setClub}
        />
        <div>
          <Title1 weight="bold">{clubName}</Title1>
          <Flex alignItems="center">
            <Body2 className={`${deptCaptionColor[category]}`}>
              {category}
            </Body2>
            <Body2 weight="normal" className="px-1.5 text-gray-300">
              |
            </Body2>
            <div className="w-2/3">
              <Input
                onClickReset={() => {}}
                name="tag"
                value={tag}
                onChange={onChange}
                disabled={true}
              />
            </div>
          </Flex>
        </div>
      </Flex>
    </>
  );
}
