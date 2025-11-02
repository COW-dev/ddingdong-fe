import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import {
  useCreateReportMutation,
  useUpdateReportsMutation,
} from '@/app/_api/mutations/report';
import { Report, ReportAPIRequest } from '@/app/_api/types/report';

import { parseRequest } from '../_utils/parse';
import { validateDate } from '../_utils/validateReport';

export const useReport = (term: number, reports?: [Report, Report]) => {
  const router = useRouter();

  const [reportOne, setReportOne] = useState(reports?.[0] ?? EMPTY_DATA);
  const [reportTwo, setReportTwo] = useState(reports?.[1] ?? EMPTY_DATA);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutate: createMutation } = useCreateReportMutation();
  const { mutate: updateMutation } = useUpdateReportsMutation();

  const createPairReport = (
    term: number,
  ): [ReportAPIRequest, ReportAPIRequest] => {
    const parseReportOne = parseRequest(term, reportOne);
    const parseReportTwo = parseRequest(term, reportTwo);
    return [parseReportOne, parseReportTwo];
  };

  const submitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateDate(reportOne) || !validateDate(reportTwo))
      return toast.error('날짜와 시간은 일부만 저장할 수 없어요.');

    setIsEditing(true);
    const payload = createPairReport(term);
    await createMutation(payload, {
      onSuccess: () => {
        toast.success('활동보고서가 생성되었습니다.');
        router.push('/report');
      },
      onError: (error: Error) => {
        if (error instanceof ApiError) {
          toast.error(error.message);
        }
      },
    });
    setIsEditing(false);
  };

  const submitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateDate(reportOne) || !validateDate(reportTwo))
      return toast.error('날짜와 시간은 일부만 저장할 수 없어요.');

    setIsEditing(true);
    const payload = createPairReport(term);
    await updateMutation(
      {
        term: term,
        activityReportRequests: payload,
      },
      {
        onSuccess: () => {
          toast.success('활동보고서를 수정했어요.');
          router.push('/report');
        },
        onError: (error: Error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
          }
        },
      },
    );
    setIsEditing(false);
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

export const EMPTY_DATA: Report = {
  date: { startDate: null, endDate: null },
  participants: [],
};
