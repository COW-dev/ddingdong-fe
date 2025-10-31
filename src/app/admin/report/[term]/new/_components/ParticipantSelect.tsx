'use client';
import { Dispatch, SetStateAction } from 'react';

import { Caption1, Flex, Input } from 'ddingdong-design-system';

import { Member } from '@/app/_api/types/member';
import { StudentInfo } from '@/types/report';
import { useParticipantSelect } from '../_hooks/useParticipantSelect';

type Props = {
  name?: string;
  setData: Dispatch<SetStateAction<StudentInfo[]>>;
  id: number;
};

export default function ParticipantSelect({ name, setData, id }: Props) {
  const {
    keyword,
    filteredList,
    isEditing,
    handleKeywordChange,
    handleBlur,
    handleSelectMember,
  } = useParticipantSelect({
    name,
    setData,
    id,
  });

  return (
    <li className="relative">
      <Input
        value={keyword}
        onChange={(e) => handleKeywordChange(e.target.value)}
        onBlur={handleBlur}
        onClickReset={() => handleKeywordChange('')}
      />
      <div
        className={`${
          !isEditing && `hidden`
        } fixed z-10 mt-2 h-fit max-h-[50vh] w-56 overflow-scroll rounded-md border border-gray-100 bg-white shadow-lg`}
      >
        <div tabIndex={0} onBlur={handleBlur}>
          {filteredList?.map((item, index) => (
            <Flex
              key={index}
              className="gap-5 p-4 hover:bg-gray-50"
              onMouseDown={() => handleSelectMember(item)}
            >
              <Caption1 weight="normal">{item.name}</Caption1>
              <Caption1 weight="normal" className="text-gray-400">
                {item.studentNumber}
              </Caption1>
            </Flex>
          ))}
        </div>
      </div>
    </li>
  );
}
