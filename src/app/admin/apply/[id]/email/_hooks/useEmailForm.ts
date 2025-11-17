import { useState } from 'react';

import {
  APPLICANT_PLACEHOLDER,
  EMAIL_STATUS,
  TEMPLATE,
} from '@/app/admin/apply/[id]/_constants/apply';
import { toast } from 'react-hot-toast';

export const useEmailForm = () => {
  const [title, setTitle] = useState<string>('');
  const [target, setTarget] = useState(EMAIL_STATUS.FIRST_PASS);
  const [message, setMessage] = useState<string>(TEMPLATE);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleResetTitle = () => {
    setTitle('');
  };

  const handleChangeTarget = (
    targetValue: (typeof EMAIL_STATUS)[keyof typeof EMAIL_STATUS],
  ) => {
    setTarget(targetValue as typeof EMAIL_STATUS.FIRST_PASS);
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!newValue.includes(APPLICANT_PLACEHOLDER)) {
      return;
    }
    setMessage(newValue);
  };

  return {
    title,
    target,
    message,
    handleChangeTitle,
    handleChangeTarget,
    handleChangeMessage,
    handleResetTitle,
  };
};
