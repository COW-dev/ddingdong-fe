import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { memberQueryOptions } from '@/app/_api/queries/member';

import { Member } from '@/app/_api/types/member';
import { StudentInfo } from '@/types/report';
import { useSuspenseQuery } from '@tanstack/react-query';
import { EMPTY_PARTICIPANT } from '../_components/ParticipantModal';
import toast from 'react-hot-toast';

type Props = {
  name?: string;
  setData: Dispatch<SetStateAction<StudentInfo[]>>;
  id: number;
};

export function useParticipantSelect({ name, setData, id }: Props) {
  const { data } = useSuspenseQuery(memberQueryOptions.all());
  const members = data?.clubMembers;

  const [keyword, setKeyword] = useState(name || '');
  const [filteredList, setFilteredList] = useState(members);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (keyword) {
      setFilteredList(members.filter((item) => item.name.includes(keyword)));
    } else {
      setFilteredList(members);
    }
  }, [keyword, members]);

  const updateParticipant = (newParticipant: StudentInfo) => {
    setData((prev) =>
      prev.map((participant, index) =>
        index === id ? newParticipant : participant,
      ),
    );
  };

  const handleKeywordChange = (value: string) => {
    setIsEditing(true);
    setKeyword(value);
    if (!value.trim()) updateParticipant(EMPTY_PARTICIPANT);
  };

  const handleBlur = () => {
    if (keyword.trim() && isEditing) {
      setKeyword('');
      updateParticipant(EMPTY_PARTICIPANT);
    }
    setIsEditing(false);
  };

  const handleSelectMember = (member: Member) => {
    setKeyword(member.name);
    setIsEditing(false);
    updateParticipant({
      name: member.name,
      studentId: member.studentNumber,
      department: member.department,
    });
  };

  return {
    keyword,
    filteredList,
    isEditing: isEditing && !!keyword.trim(),
    handleBlur,
    handleKeywordChange,
    handleSelectMember,
  };
}
