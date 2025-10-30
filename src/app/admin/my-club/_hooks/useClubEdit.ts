import { ChangeEvent, useState } from 'react';
import { ClubDetail } from '@/app/_api/types/club';
import { useUpdateClub } from '@/app/_api/mutations/club';
import { toast } from 'react-hot-toast';

export const useClubEdit = (initialData: ClubDetail) => {
  const [club, setClub] = useState<ClubDetail>(initialData);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutateAsync: updateClub } = useUpdateClub();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setClub((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleClickCancel = () => {
    setIsEditing(false);
    setClub(initialData);
  };

  const handleClickSubmit = () => {
    const requestData = {
      ...club,
      clubLeader: club.leader,
      profileImageId: club.profileImage.id ?? null,
      introductionImageId: club.introductionImage.id ?? null,
      startRecruitPeriod: '',
      endRecruitPeriod: '',
      formUrl: '',
    };
    updateClub(requestData);
    setIsEditing(false);
    toast.success('동아리 정보를 수정했어요.');
  };

  return {
    club,
    setClub,
    isEditing,
    handleChange,
    handleClickEdit,
    handleClickCancel,
    handleClickSubmit,
  };
};
