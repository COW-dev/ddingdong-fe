import { useState } from 'react';

import {
  APPLICANT_PLACEHOLDER,
  EMAIL_STATUS,
  TEMPLATE,
} from '@/app/admin/apply/[id]/_constants/apply';

export const useEmailForm = () => {
  const [title, setTitle] = useState<string>('');
  const [target, setTarget] = useState(EMAIL_STATUS.FIRST_PASS);
  const [message, setMessage] = useState<string>(TEMPLATE);

  const handleChangeTarget = (targetValue: typeof EMAIL_STATUS.FIRST_PASS) => {
    setTarget(targetValue);
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
    setTitle,
    setTarget: handleChangeTarget,
    setMessage: handleChangeMessage,
  };
};
