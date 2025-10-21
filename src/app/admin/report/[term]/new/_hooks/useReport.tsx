'use client';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

import {
  useCreateReportMutation,
  useUpdateReportsMutation,
} from '@/app/_api/mutations/report';
import { EditReport, SubmitReport } from '@/types/report';
import { parseNewReportToReport } from '@/utils/parse';

export const useReport = (initReport: [EditReport, EditReport]) => {
  const currentTerm = { term: 5 };

  const [reportOne, setReportOne] = useState<EditReport>(initReport[0]);
  const [reportTwo, setReportTwo] = useState<EditReport>(initReport[1]);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);

  const { mutateAsync: createReports } = useCreateReportMutation();
  const { mutateAsync: updateReports } = useUpdateReportsMutation();

  const createPairReport = (term: number): [SubmitReport, SubmitReport] => {
    const parseReportOne = parseNewReportToReport(term, reportOne);
    const parseReportTwo = parseNewReportToReport(term, reportTwo);
    return [parseReportOne, parseReportTwo];
  };

  const validateDate = (report: EditReport) => {
    const { endTime, startTime, date } = report;
    if (endTime === '' && startTime === '' && !date.startDate) return true;
    return endTime !== '' && startTime !== '' && date.startDate;
  };

  const submitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(true);
    try {
      if (!validateDate(reportOne) || !validateDate(reportTwo))
        return toast.error('날짜와 시간을 모두 선택해주세요.');

      const payload = createPairReport(currentTerm.term);
      await createReports(payload);
      toast.success('활동 보고서를 성공적으로 생성했어요.');
      router.push('/report');
    } catch (error) {
      toast.error('활동보고서 생성에 실패했어요.');
    } finally {
      setIsEditing(false);
    }
  };

  const submitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditing(true);

    try {
      if (!validateDate(reportOne) || !validateDate(reportTwo))
        return toast.error('날짜와 시간을 모두 선택해주세요.');
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
    uploadFileOne,
    setUploadFileOne,
    uploadFileTwo,
    setUploadFileTwo,
    setReportOne,
    setReportTwo,
    submitCreate,
    submitUpdate,
  };
};
