import { useState } from 'react';

import type { PairGameSubmitFormValues } from '@/app/_api/types/pair_game';

import { usePairGameSubmitAction } from './usePairGameSubmitAction';

export type { PairGameSubmitFormValues as SubmitFormValues };

const INIT: PairGameSubmitFormValues = {
  name: '',
  studentNumber: '',
  department: '',
  phoneNumber: '',
};

export const usePairGameSubmit = () => {
  const [formData, setFormData] = useState<PairGameSubmitFormValues>(INIT);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const { submit, isPending } = usePairGameSubmitAction();

  const handleChange = (key: keyof PairGameSubmitFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
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
    submit(formData, receiptFile);
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
