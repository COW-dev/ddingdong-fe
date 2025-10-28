import { useState, useEffect } from 'react';

import { Member } from '@/app/_api/types/member';
import { StudentInfo } from '@/types/report';

type Props = {
  name?: string;
  setData: (updateFn: (prev: StudentInfo[]) => StudentInfo[]) => void;
  members: Member[];
  id: number;
};

export function useParticipantSelect({ name, setData, members, id }: Props) {
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

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);

    if (keyword === '') {
      setData((prev) => {
        const updatedParticipants = [...prev];
        updatedParticipants[id] = {
          ...updatedParticipants[id],
          name: '',
          studentId: '',
          department: '',
        };
        return updatedParticipants;
      });
    }
  };

  const handleSelectMember = (value: Member) => {
    setKeyword(value.name);
    setIsEditing(false);
    setData((prev) => {
      const updatedParticipants = [...prev];
      updatedParticipants[id] = {
        ...updatedParticipants[id],
        name: value.name,
        studentId: value.studentNumber,
        department: value.department,
      };
      return updatedParticipants;
    });
  };

  return {
    keyword,
    filteredList,
    isEditing: isEditing && keyword !== '',
    handleKeywordChange,
    handleFocus,
    handleBlur,
    handleSelectMember,
  };
}
