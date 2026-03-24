import { useSuspenseQuery } from '@tanstack/react-query';

import { applyQueryOptions } from '@/_api/queries/apply';
import { filterApplicants } from '@/admin/apply/[id]/_utils/filter';

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
