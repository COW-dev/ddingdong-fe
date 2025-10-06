import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { useAddFaq } from '@/app/_api/mutations/faq';
import { FAQ } from '@/app/_api/types/faq';

export const useFAQ = () => {
  const [editMode, setEditMode] = useState(false);
  const [newFAQs, setNewFAQs] = useState<FAQ[]>([]);

  const { mutate: addFaq } = useAddFaq();

  const handleAddNewFAQ = () => {
    const newFAQ: FAQ = {
      id: Date.now(),
      question: '',
      reply: '',
    };
    setNewFAQs((prev) => [newFAQ, ...prev]);
  };

  const handleEditFAQ = () => {
    setEditMode(true);
    handleAddNewFAQ();
  };

  const handleCancelFAQ = () => {
    setEditMode(false);
    setNewFAQs([]);
  };

  const handleSaveFAQ = async () => {
    if (newFAQs.some((faq) => faq.question.trim() === '')) {
      toast.error('질문을 입력해주세요.');
      return;
    }

    if (newFAQs.some((faq) => faq.reply.trim() === '')) {
      toast.error('답변을 입력해주세요.');
      return;
    }

    for (const faq of newFAQs) {
      await addFaq({ question: faq.question, reply: faq.reply });
    }
    toast.success('FAQ가 추가되었습니다.');
    setEditMode(false);
    setNewFAQs([]);
  };

  const handleUpdateNewFAQ = (
    id: number,
    field: 'question' | 'reply',
    value: string,
  ) => {
    setNewFAQs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
    );
  };

  const handleDeleteNewFAQ = (id: number) => {
    setNewFAQs((prev) => prev.filter((faq) => faq.id !== id));
  };

  return {
    editMode,
    newFAQs,
    handleAddNewFAQ,
    handleEditFAQ,
    handleCancelFAQ,
    handleSaveFAQ,
    handleUpdateNewFAQ,
    handleDeleteNewFAQ,
  };
};
