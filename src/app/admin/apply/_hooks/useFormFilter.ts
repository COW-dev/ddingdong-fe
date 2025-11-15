import { useMemo, useState } from 'react';

import { Form } from '@/app/_api/types/apply';

import { FORM_STATUS_FILTER, FormStatusFilter } from '../_constants/formFilter';

type FormCounts = {
  [FORM_STATUS_FILTER.ALL]: number;
  [FORM_STATUS_FILTER.BEFORE]: number;
  [FORM_STATUS_FILTER.IN_PROGRESS]: number;
  [FORM_STATUS_FILTER.CLOSED]: number;
};

export const useFormFilter = (forms: Form[]) => {
  const [formFilter, setFormFilter] = useState<FormStatusFilter>(
    FORM_STATUS_FILTER.ALL,
  );

  const formCounts = useMemo<FormCounts>(
    () => ({
      [FORM_STATUS_FILTER.ALL]: forms.length,
      [FORM_STATUS_FILTER.BEFORE]: forms.filter(
        (form) => form.formStatus === FORM_STATUS_FILTER.BEFORE,
      ).length,
      [FORM_STATUS_FILTER.IN_PROGRESS]: forms.filter(
        (form) => form.formStatus === FORM_STATUS_FILTER.IN_PROGRESS,
      ).length,
      [FORM_STATUS_FILTER.CLOSED]: forms.filter(
        (form) => form.formStatus === FORM_STATUS_FILTER.CLOSED,
      ).length,
    }),
    [forms],
  );

  const filteredForms = useMemo(() => {
    if (formFilter === FORM_STATUS_FILTER.ALL) {
      return forms;
    }
    return forms.filter((form) => form.formStatus === formFilter);
  }, [forms, formFilter]);

  const handleFilterChange = (filter: string) => {
    setFormFilter(filter as FormStatusFilter);
  };

  return {
    formCounts,
    formFilter,
    filteredForms,
    handleFilterChange,
  };
};
