'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { clubQueryOptions } from '@/app/_api/queries/club';
import AdminClubHeading from '@/app/admin/my-club/_components/ClubHeadingForm';
import ClubInfoForm from '@/app/admin/my-club/_components/ClubInfoForm';

import { ClubIntroductionForm } from '../_components/ClubIntroductionForm';
import { EditActionButtons } from '../_components/EditActionButtons';
import {
  ClubContainer,
  ClubHeadingContainer,
} from '../_containers/ClubContainer';
import { useClubEdit } from '../_hooks/useClubEdit';

export default function ClubDetailClientPage() {
  const { data: clubData } = useSuspenseQuery(clubQueryOptions.my());

  const {
    club,
    setClub,
    isEditing,
    handleChange,
    handleClickEdit,
    handleClickCancel,
    handleClickSubmit,
  } = useClubEdit(clubData);

  return (
    <ClubContainer>
      <ClubHeadingContainer>
        <AdminClubHeading
          club={club}
          setClub={setClub}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <EditActionButtons
          isEditing={isEditing}
          onEdit={handleClickEdit}
          onCancel={handleClickCancel}
          onSubmit={handleClickSubmit}
        />
      </ClubHeadingContainer>
      <ClubInfoForm
        club={club}
        setClub={setClub}
        isEditing={isEditing}
        onChange={handleChange}
      />
      <ClubIntroductionForm
        club={club}
        isEditing={isEditing}
        setClub={setClub}
        onChange={handleChange}
      />
    </ClubContainer>
  );
}
