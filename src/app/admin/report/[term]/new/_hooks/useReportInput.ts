'use client';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  DateRangeType,
  DateValueType,
} from 'react-tailwindcss-datepicker/dist/types';
import { EditReport } from '@/types/report';

type UseReportInputProps = {
  setValue: Dispatch<SetStateAction<EditReport>>;
};

export const useReportInput = ({ setValue }: UseReportInputProps) => {
  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDateChange = (selectedDate: DateValueType) => {
    setValue((prev) => ({
      ...prev,
      date: selectedDate as DateRangeType,
    }));
  };

  const handleTimeReset = () => {
    setValue((prev) => ({
      ...prev,
      startTime: null,
      endTime: null,
    }));
  };

  return {
    handleChange,
    handleDateChange,
    handleTimeReset,
  };
};
