import { useRouter, useParams } from 'next/navigation';

import { toast } from 'react-hot-toast';

import { useCreateResultEmail } from '@/app/_api/mutations/apply';
import { EmailSendAPIResponse } from '@/app/_api/types/email';
import {
  APPLICANT_PLACEHOLDER,
  EMAIL_STATUS,
} from '@/app/admin/apply/[id]/_constants/apply';

const EMAIL_STATUS_REVERSE = Object.fromEntries(
  Object.entries(EMAIL_STATUS).map(([key, value]) => [value, key]),
) as Record<string, keyof typeof EMAIL_STATUS>;

export const useEmailSubmit = () => {
  const { id } = useParams();
  const router = useRouter();
  const mutation = useCreateResultEmail();

  const validateMessage = (message: string): boolean => {
    if (!message.includes(APPLICANT_PLACEHOLDER)) {
      toast.error('메시지에 {지원자명} 플레이스홀더가 필요합니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = (title: string, target: string, message: string) => {
    if (!validateMessage(message)) {
      return;
    }
    mutation.mutate(
      {
        formId: Number(id),
        title,
        target: EMAIL_STATUS_REVERSE[target],
        message,
      },
      {
        onSuccess: (data: EmailSendAPIResponse) => {
          router.push(
            `/apply/${id}/email/deliveries?status=in-progress&historyId=${data?.formEmailSendHistoryId}`,
          );
        },
        onError: () => {
          toast.error('다시 시도해주세요.');
        },
      },
    );
  };

  return {
    handleSubmit,
    isSubmitting: mutation.isPending,
  };
};
