import { ChangeEvent, useState } from 'react';

import { toast } from 'react-hot-toast';

import { useUpdateClub } from '@/app/_api/mutations/club';
import { ClubDetail } from '@/app/_api/types/club';

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

  function handleReset(name: string) {
    setClub((prev) => ({
      ...prev,
      [name]: '',
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
      location: club.location || null,
      phoneNumber: club.phoneNumber || null,
      clubLeader: club.leader,
      profileImageId: club.profileImage?.id ?? null,
      introductionImageId: club.introductionImage?.id ?? null,
      formUrl: '',
    };

    updateClub(requestData, {
      onSuccess: () => {
        setIsEditing(false);
        toast.success('동아리 정보를 수정했어요.');
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    });
  };

  return {
    club,
    setClub,
    isEditing,
    handleChange,
    handleReset,
    handleClickEdit,
    handleClickCancel,
    handleClickSubmit,
  };
};
