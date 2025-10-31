import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import {
  DateValueType,
  DateRangeType,
} from 'react-tailwindcss-datepicker/dist/types';

import { Report } from '@/app/_api/types/report';

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

  const handleDateChange = (date: DateValueType) => {
    setValue((prev) => ({
      ...prev,
      date: date as DateRangeType,
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
