import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { Report } from '@/_api/types/report';

type Props = {
  setValue: Dispatch<SetStateAction<Report>>;
};

export const useReportInput = ({ setValue }: Props) => {
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDateChange = (date: Date) => {
    setValue((prev) => ({
      ...prev,
      date: {
        startDate: date,
        endDate: date,
      },
    }));
  };

  const handleReset = (name: string) => {
    setValue((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  return {
    handleChange,
    handleDateChange,
    handleReset,
  };
};
