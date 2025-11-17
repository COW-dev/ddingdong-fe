import { useRouter } from 'next/navigation';

import { toast } from 'react-hot-toast';

import {
  useDeleteApplication,
  useRegisterApplication,
} from '@/app/_api/mutations/apply';

export const useFormActions = (formId: number) => {
  const router = useRouter();
  const deleteMutation = useDeleteApplication();
  const registerMutation = useRegisterApplication();

  const handleRegister = () => {
    registerMutation.mutate(formId, {
      onSuccess: () => {
        toast.success('명단 연동에 성공했어요.');
      },
      onError: () => {
        toast.error('명단 연동에 실패했어요.');
      },
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(formId, {
      onSuccess: () => {
        toast.success('지원서를 성공적으로 삭제했어요.');
        router.push('/apply');
      },
      onError: () => {
        toast.error('지원서 삭제를 실패했어요.');
      },
    });
  };

  return {
    handleRegister,
    handleDelete,
  };
};
