import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { ApiError } from '@/_api/fetcher';
import {
  useCreateReportMutation,
  useUpdateReportsMutation,
} from '@/_api/mutations/report';
import { Report, ReportAPIRequest } from '@/_api/types/report';
import { REPORT_MESSAGE } from '@/_constants/reportMessage';

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
      return toast.error(REPORT_MESSAGE.partialDateTime);

    setIsEditing(true);
    const payload = createPairReport(term);
    await createMutation(payload, {
      onSuccess: () => {
        toast.success(REPORT_MESSAGE.createSuccess);
        router.push('/report');
      },
      onError: (error: Error) => {
        // 400(회차 기간 오류)은 mutation의 onError가 이미 토스트함
        if (error instanceof ApiError && error.status !== 400) {
          toast.error(error.message);
        }
      },
    });
    setIsEditing(false);
  };

  const submitUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateDate(reportOne) || !validateDate(reportTwo))
      return toast.error(REPORT_MESSAGE.partialDateTime);

    setIsEditing(true);
    const payload = createPairReport(term);
    await updateMutation(
      {
        term: term,
        activityReportRequests: payload,
      },
      {
        onSuccess: () => {
          toast.success(REPORT_MESSAGE.updateSuccess);
          router.push('/report');
        },
        onError: (error: Error) => {
          // 400(회차 기간 오류)은 mutation의 onError가 이미 토스트함
          if (error instanceof ApiError && error.status !== 400) {
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
