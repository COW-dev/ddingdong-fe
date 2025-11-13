import { ChangeEvent, useState } from 'react';

import { Member } from '@/app/_api/types/member';
import { Position } from '@/constants/position';

export const useUpdateMember = (member: Member) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<Member>(member);
  const [positionNum, setPositionNum] = useState<number>(0);

  const handleReset = () => {
    setIsEditing(false);
    setMemberInfo(member);
  };

  const handleMemberInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMemberInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePositionNum = () => {
    if (positionNum === 2) setPositionNum(0);
    else setPositionNum(positionNum + 1);
    setMemberInfo((prev) => ({
      ...prev,
      position: Object.keys(Position)[positionNum],
    }));
  };

  const finishEditing = () => {
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  return {
    isEditing,
    memberInfo,
    startEditing,
    handleReset,
    finishEditing,
    handleMemberInfoChange,
    handlePositionNum,
  };
};
