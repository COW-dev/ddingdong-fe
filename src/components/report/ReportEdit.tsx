import React from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import { useUpdateReports } from '@/hooks/api/club/useUpdateReports';
import { useReport } from '@/hooks/common/useReport';

import { EditReport } from '@/types/report';
import Form from './Form';
import Accordion from '../common/Accordion';

type ReportEditProps = {
  report?: [EditReport, EditReport];
  term?: number;
};

function ReportEdit({ report, term = 0 }: ReportEditProps) {
  const router = useRouter();
  const createMutation = useNewReport();
  const modifyMutation = useUpdateReports(term);

  const {
    uploadFileOne,
    setUploadFileOne,
    uploadFileTwo,
    setUploadFileTwo,
    setReportOne,
    setReportTwo,
    reportOne,
    reportTwo,
    createFormData,
    setRemoveFileOne,
    setRemoveFileTwo,
  } = useReport(report ?? [EMPTY_DATA, EMPTY_DATA]);

  const validateDate = (report: EditReport) => {
    const { endTime, startTime, date } = report;
    if (endTime === '' && startTime === '' && !date.startDate) return true;
    return endTime !== '' && startTime !== '' && date.startDate;
  };

  const handleClickModifyButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    let formData = new FormData();
    formData = await createFormData(formData, term);

    if (!validateDate(reportOne) || !validateDate(reportTwo))
      return toast.error('날짜와 시간을 선택해야 저장할 수 있어요.');

    return modifyMutation.mutate(formData);
  };

  const handleClickCreateButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!validateDate(reportOne) || !validateDate(reportTwo))
      return toast.error('날짜와 시간을 선택해야 저장할 수 있어요.');

    let formData = new FormData();
    formData = await createFormData(formData, term);
    return createMutation.mutate(formData);
  };

  return (
    <>
      <form
        className="mt-5 w-full md:mt-10"
        onSubmit={report ? handleClickModifyButton : handleClickCreateButton}
      >
        <Accordion title="활동1">
          <Form
            uploadFiles={uploadFileOne}
            report={reportOne}
            id={1}
            setValue={setReportOne}
            setImage={setUploadFileOne}
            setRemoveFile={setRemoveFileOne}
          />
        </Accordion>
        <Accordion title="활동2">
          <Form
            uploadFiles={uploadFileTwo}
            report={reportTwo}
            id={2}
            setValue={setReportTwo}
            setImage={setUploadFileTwo}
            setRemoveFile={setRemoveFileTwo}
          />
        </Accordion>
        <div className="m-auto flex justify-center md:mt-6">
          {report ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="h-11 w-16 rounded-xl bg-gray-100 px-1 py-2.5 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-200 sm:inline-block md:text-base"
              >
                취소
              </button>
              <button
                type="submit"
                className="h-11 w-24 rounded-xl bg-blue-500 px-1 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-600 sm:inline-block md:text-base"
              >
                제출
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="h-11 w-28 rounded-xl bg-blue-100 px-1 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base"
            >
              생성하기
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default ReportEdit;

const participant = {
  name: '',
  studentId: '',
  department: '',
};

export const EMPTY_DATA = {
  term: 0,
  date: { startDate: null, endDate: null },
  place: '',
  startTime: '',
  endTime: '',
  uploadFiles: null,
  content: '',
  participants: [
    participant,
    participant,
    participant,
    participant,
    participant,
  ],
};
