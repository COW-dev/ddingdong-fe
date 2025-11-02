'use client';
import { ChangeEvent, ComponentProps, Dispatch, SetStateAction } from 'react';

import { Body2, Flex, Input } from 'ddingdong-design-system';

import { ClubDetail } from '@/app/_api/types/club';

type Props = {
  club: ClubDetail;
  isEditing: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onReset: (name: string) => void;
};

export default function ClubInfoForm({
  club,
  isEditing,
  onChange,
  onReset,
}: Props) {
  const { leader, phoneNumber, location, regularMeeting } = club;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
      <CustomInput
        label="회장"
        onClickReset={() => onReset('leader')}
        name="leader"
        value={leader}
        onChange={onChange}
        isEditing={isEditing}
      />
      <CustomInput
        label="연락처"
        name="phoneNumber"
        onClickReset={() => onReset('phoneNumber')}
        placeholder="ex) 010-1234-1234"
        value={phoneNumber}
        onChange={onChange}
        isEditing={isEditing}
      />
      <CustomInput
        label="동아리방"
        onClickReset={() => onReset('location')}
        name="location"
        placeholder="ex) S0000"
        value={location}
        onChange={onChange}
        isEditing={isEditing}
      />
      <CustomInput
        label="정기모임"
        onClickReset={() => onReset('regularMeeting')}
        name="regularMeeting"
        value={regularMeeting}
        onChange={onChange}
        isEditing={isEditing}
      />
    </div>
  );
}

function CustomInput({
  label,
  isEditing,
  value,
  ...props
}: {
  label: string;
  isEditing: boolean;
  value: string;
  onClickReset: () => void;
} & ComponentProps<'input'>) {
  return (
    <Flex alignItems="center" gap={4}>
      <Body2 as="label" className="w-20 text-gray-500">
        {label}
      </Body2>
      {isEditing ? (
        <Input value={value} {...props} />
      ) : (
        <div className="h-13 w-full rounded-xl px-4 py-3.5 outline-1 outline-gray-200">
          {value}
        </div>
      )}
    </Flex>
  );
}
