import { useSuspenseQuery } from '@tanstack/react-query';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import { filterApplicants } from '@/app/admin/apply/[id]/_utils/filter';

export const useFormData = (formId: number) => {
  const { data: applicationData } = useSuspenseQuery(
    applyQueryOptions.application(formId),
  );

  const { documentApplicants, interviewApplicants } = filterApplicants(
    applicationData.formApplications,
  );

  return {
    applicationData,
    documentApplicants,
    interviewApplicants,
  };
};
