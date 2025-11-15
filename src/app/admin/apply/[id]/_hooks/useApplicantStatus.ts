import { toast } from 'react-hot-toast';

import { useUpdateApplicantStatus } from '@/app/_api/mutations/apply';
import { ApplicantStatus } from '@/app/_api/types/apply';
import { getNextStatus } from '@/app/admin/apply/[id]/_utils/filter';

export const useApplicantStatus = (
  formId: number,
  applicantId: number,
  currentStatus: ApplicantStatus,
  hasInterview: boolean,
) => {
  const statusMutation = useUpdateApplicantStatus();

  const handleUpdateStatus = (isPass: boolean) => {
    const nextStatus = getNextStatus(currentStatus, hasInterview, isPass);

    statusMutation.mutate(
      {
        formId,
        applicationIds: [applicantId],
        status: nextStatus,
      },
      {
        onSuccess: () => {
          toast.success('지원자 상태 수정에 성공했어요.');
        },
        onError: () => {
          toast.error('지원자 상태 수정에 실패했어요.');
        },
      },
    );
  };

  return {
    handleUpdateStatus,
  };
};
