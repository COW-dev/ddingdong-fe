'use client';
import { ChangeEvent, ComponentProps, Dispatch, SetStateAction } from 'react';

import { Body2, Flex, Input } from 'ddingdong-design-system';
import toast from 'react-hot-toast';

import { ClubDetail } from '@/app/_api/types/club';
import { validator } from '@/utils/validator';

type ClubInfoFormProps = {
  club: ClubDetail;
  setClub: Dispatch<SetStateAction<ClubDetail>>;
  isEditing: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onReset: (name: string) => void;
};

export default function ClubInfoForm({
  club,
  setClub,
  isEditing,
  onChange,
  onReset,
}: ClubInfoFormProps) {
  const { leader, phoneNumber, location, regularMeeting } = club;

  function handleValueValidate(object: { type: string; value: string }) {
    if (object.value && !validator(object)) {
      toast.error('형식에 맞춰 재입력해주세요.');
      setClub((prev) => ({
        ...prev,
        [object.type]: '',
      }));
    }
  }

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
        onBlur={() =>
          handleValueValidate({ type: 'phoneNumber', value: phoneNumber })
        }
      />
      <CustomInput
        label="동아리방"
        onClickReset={() => onReset('location')}
        name="location"
        placeholder="ex) S0000"
        value={location}
        onChange={onChange}
        isEditing={isEditing}
        onBlur={() =>
          handleValueValidate({ type: 'location', value: location })
        }
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
