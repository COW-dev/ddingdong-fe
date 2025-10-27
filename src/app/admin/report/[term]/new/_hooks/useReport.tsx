'use client';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import {
  useCreateReportMutation,
  useUpdateReportsMutation,
} from '@/app/_api/mutations/report';
import { EditReport, SubmitReport } from '@/types/report';
import { reportQueryOptions } from '@/app/_api/queries/report';
import { parseNewReportToReport } from '@/utils/parse';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useReport = (initReport?: [EditReport, EditReport]) => {
  const router = useRouter();
  const { data: currentTerm } = useSuspenseQuery(
    reportQueryOptions.currentTerm(),
  );

  const [reportOne, setReportOne] = useState(initReport?.[0] ?? EMPTY_DATA);
  const [reportTwo, setReportTwo] = useState(initReport?.[1] ?? EMPTY_DATA);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutateAsync: createReports } = useCreateReportMutation();
  const { mutateAsync: updateReports } = useUpdateReportsMutation();

  const createPairReport = (term: number): [SubmitReport, SubmitReport] => {
    const parseReportOne = parseNewReportToReport(term, reportOne);
    const parseReportTwo = parseNewReportToReport(term, reportTwo);
    return [parseReportOne, parseReportTwo];
  };

  const submitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateDate(reportOne) || !validateDate(reportTwo))
      return toast.error('날짜와 시간을 모두 선택해주세요.');

    try {
      setIsEditing(true);
      const payload = createPairReport(currentTerm.term);
      await createReports(payload);
      toast.success('활동 보고서를 생성했어요.');
      router.push('/report');
    } catch (error) {
      toast.error('활동보고서 생성에 실패했어요.');
    } finally {
      setIsEditing(false);
    }
  };

  const submitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateDate(reportOne) || !validateDate(reportTwo))
      return toast.error('날짜와 시간을 모두 선택해주세요.');

    try {
      setIsEditing(true);
      const payload = createPairReport(currentTerm.term);
      await updateReports({
        term: currentTerm.term,
        activityReportRequests: payload,
      });
      toast.success('활동보고서를 수정했어요.');
      router.push('/report');
    } catch (error) {
      toast.error('활동보고서 수정에 실패했어요.');
    } finally {
      setIsEditing(false);
    }
  };

  return {
    isEditing,
    setIsEditing,
    createPairReport,
    reportOne,
    reportTwo,
    setReportOne,
    setReportTwo,
    submitCreate,
    submitUpdate,
  };
};

export const EMPTY_DATA: EditReport = {
  term: 0,
  date: { startDate: null, endDate: null },
  place: '',
  startTime: null,
  endTime: null,
  uploadFiles: null,
  content: '',
  participants: [],
  imageId: null,
};

const validateDate = (report: EditReport) => {
  const { endTime, startTime, date } = report;

  if (!endTime && !startTime && !date.startDate) return true;
  return endTime && startTime && date.startDate;
};
