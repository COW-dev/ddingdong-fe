import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import {
  useCreateReportMutation,
  useUpdateReportsMutation,
} from '@/app/_api/mutations/report';
import { EditReport, SubmitReport } from '@/types/report';

import { parseNewReportToReport } from '../_utils/parseReport';
import { validateDate } from '../_utils/validateReport';

export const useReport = (term: number, reports?: [EditReport, EditReport]) => {
  const router = useRouter();

  const [reportOne, setReportOne] = useState(reports?.[0] ?? EMPTY_DATA);
  const [reportTwo, setReportTwo] = useState(reports?.[1] ?? EMPTY_DATA);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutate: createMutation } = useCreateReportMutation();
  const { mutate: updateMutation } = useUpdateReportsMutation();

  const createPairReport = (term: number): [SubmitReport, SubmitReport] => {
    const parseReportOne = parseNewReportToReport(term, reportOne);
    const parseReportTwo = parseNewReportToReport(term, reportTwo);
    return [parseReportOne, parseReportTwo];
  };

  const submitCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateDate(reportOne) || !validateDate(reportTwo))
      return toast.error('날짜와 시간을 모두 선택해주세요.');

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
      return toast.error('날짜와 시간을 모두 선택해주세요.');

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

export const EMPTY_DATA: EditReport = {
  date: { startDate: null, endDate: null },
  uploadFiles: null,
  participants: [],
};
