import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useCreatePairGameApplier } from '@/app/_api/mutations/pair_game';

export type SubmitFormValues = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
};

const INIT: SubmitFormValues = {
  name: '',
  studentNumber: '',
  department: '',
  phoneNumber: '',
};

export const usePairGameSubmit = (
  onSubmit: (data: SubmitFormValues) => void,
) => {
  const [formData, setFormData] = useState<SubmitFormValues>(INIT);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const { mutate: createApplier, isPending } = useCreatePairGameApplier();

  const handleChange = (key: keyof SubmitFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }) as SubmitFormValues);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setReceiptFile(selectedFile);
    event.target.value = '';
  };

  const clearReceiptFile = () => {
    setReceiptFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createApplier(
      {
        request: {
          name: formData.name,
          studentNumber: formData.studentNumber,
          department: formData.department,
          phoneNumber: formData.phoneNumber,
        },
        file: receiptFile as File,
      },
      {
        onSuccess: () => onSubmit(formData),
        onError: (error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
            return;
          }
          toast.error('응모 제출에 실패했어요. 다시 시도해주세요.');
        },
      },
    );
  };

  const isFormComplete =
    formData.name.trim().length > 0 &&
    formData.studentNumber.trim().length > 0 &&
    formData.department.trim().length > 0 &&
    formData.phoneNumber.trim().length > 0 &&
    Boolean(receiptFile);

  return {
    formData,
    receiptFile,
    isPending,
    isFormComplete,
    handleChange,
    handleFileChange,
    clearReceiptFile,
    handleSubmit,
  };
};
