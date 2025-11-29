import { useMemo, useState } from 'react';

import { Applicant } from '@/app/_api/types/apply';

type ApplicantType = 'DOCUMENT' | 'INTERVIEW';

type SelectedApplicants = {
  DOCUMENT: Set<number>;
  INTERVIEW: Set<number>;
};

export const useApplicantSelection = (
  applicants: Applicant[],
  type: ApplicantType,
) => {
  const [selectedApplicants, setSelectedApplicants] =
    useState<SelectedApplicants>({
      DOCUMENT: new Set(),
      INTERVIEW: new Set(),
    });

  const allChecked = useMemo(
    () =>
      applicants.length > 0 &&
      applicants.every((app) => selectedApplicants[type].has(app.id)),
    [applicants, selectedApplicants, type],
  );

  const handleAllCheck = () => {
    const newAllChecked = !allChecked;
    setSelectedApplicants((prev) => ({
      ...prev,
      [type]: newAllChecked
        ? new Set(applicants.map((applicant) => applicant.id))
        : new Set(),
    }));
  };

  const handleCheckApplicant = (id: number, checked: boolean) => {
    setSelectedApplicants((prev) => {
      const newSelected = new Set(prev[type]);
      if (checked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      return { ...prev, [type]: newSelected };
    });
  };

  const clearSelection = () => {
    setSelectedApplicants((prev) => ({
      ...prev,
      [type]: new Set(),
    }));
  };

  return {
    selectedApplicants: selectedApplicants[type],
    selectedCount: selectedApplicants[type].size,
    allChecked,
    handleAllCheck,
    handleCheckApplicant,
    clearSelection,
  };
};
