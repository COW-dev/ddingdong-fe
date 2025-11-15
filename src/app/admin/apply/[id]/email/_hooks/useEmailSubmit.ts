import { useRouter, useParams } from 'next/navigation';

import { toast } from 'react-hot-toast';

import { useCreateResultEmail } from '@/app/_api/mutations/apply';
import { EMAIL_STATUS } from '@/app/admin/apply/[id]/_constants/apply';

export const useEmailSubmit = () => {
  const { id } = useParams();
  const router = useRouter();
  const mutation = useCreateResultEmail();

  const EMAIL_STATUS_REVERSE = Object.fromEntries(
    Object.entries(EMAIL_STATUS).map(([key, value]) => [value, key]),
  ) as Record<string, keyof typeof EMAIL_STATUS>;

  const handleSubmit = (title: string, target: string, message: string) => {
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
