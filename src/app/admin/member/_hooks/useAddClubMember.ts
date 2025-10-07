import { ChangeEvent, MouseEvent, useState } from 'react';

import { Member } from '@/app/_api/types/member';

type MemberForm = Omit<Member, 'id'>;
export const useAddClubMember = () => {
  const [memberInfo, setMemberInfo] = useState<MemberForm>({
    name: '',
    studentNumber: '',
    position: 'MEMBER',
    phoneNumber: '',
    department: '',
  });

  const resetMemberInfo = () => {
    setMemberInfo({
      name: '',
      studentNumber: '',
      position: 'MEMBER',
      phoneNumber: '',
      department: '',
    });
  };

  const handleResetMemberInfo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMemberInfo((prev) => ({
      ...prev,
      [e.currentTarget.name]: '',
    }));
  };

  const handleMemberInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMemberInfoSelect = (name: string, value: string) => {
    setMemberInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    memberInfo,
    resetMemberInfo,
    handleMemberInfoChange,
    handleMemberInfoSelect,
    handleResetMemberInfo,
  };
};
