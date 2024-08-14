import React from 'react';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import { useUpdateReports } from '@/hooks/api/club/useUpdateReports';
import { useReport } from '@/hooks/common/useReport';
import { EMPTY_DATA } from '@/pages/admin/report/new/data';
import { NewReport } from '@/types/report';
import Form from './Form';
import Accordion from '../common/Accordion';

interface ReportEditProps {
  report?: [NewReport, NewReport];
  term?: number;
}

function ReportEdit({ report, term = 0 }: ReportEditProps) {
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

  const handleClickModifyButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    let formData = new FormData();
    formData = await createFormData(formData, term);
    return modifyMutation.mutate(formData);
  };

  const handleClickCreateButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
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
            setValue={setReportOne}
            setImage={setUploadFileOne}
            setRemoveFile={setRemoveFileOne}
          />
        </Accordion>
        <Accordion title="활동2">
          <Form
            uploadFiles={uploadFileTwo}
            report={reportTwo}
            setValue={setReportTwo}
            setImage={setUploadFileTwo}
            setRemoveFile={setRemoveFileTwo}
          />
        </Accordion>
        <div className="m-auto flex justify-center md:mt-6">
          <button
            type="submit"
            className="h-11 w-28 rounded-xl bg-blue-100 px-1 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base"
          >
            {report ? '수정하기' : '생성하기'}
          </button>
        </div>
      </form>
    </>
  );
}

export default ReportEdit;
