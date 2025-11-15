import { useRouter, useParams } from 'next/navigation';

import { toast } from 'react-hot-toast';

import { useCreateResultEmail } from '@/app/_api/mutations/apply';
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
        onSuccess: () => {
          toast.success('이메일 전송에 성공했어요.');
          router.push(`/apply/${id}`);
        },
        onError: () => {
          toast.error('이메일 전송에 실패했어요.');
        },
      },
    );
  };

  return {
    handleSubmit,
    isSubmitting: mutation.isPending,
  };
};
