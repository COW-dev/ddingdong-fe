import { ChangeEvent, useState } from 'react';

import { Member } from '@/app/_api/types/member';

type MemberForm = Omit<Member, 'id'>;

const INITIAL_MEMBER_INFO: MemberForm = {
  name: '',
  studentNumber: '',
  position: 'MEMBER',
  phoneNumber: '',
  department: '',
};
export const useAddClubMember = () => {
  const [memberInfo, setMemberInfo] = useState<MemberForm>(INITIAL_MEMBER_INFO);

  const resetMemberInfo = () => {
    setMemberInfo(INITIAL_MEMBER_INFO);
  };

  const handleResetMemberInfo = (name: keyof MemberForm) => {
    setMemberInfo((prev) => ({
      ...prev,
      [name]: INITIAL_MEMBER_INFO[name],
    }));
  };

  const handleMemberInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemberInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMemberInfoSelect = <K extends keyof MemberForm>(
    name: K,
    value: MemberForm[K],
  ) => {
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
