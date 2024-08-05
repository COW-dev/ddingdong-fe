import React from 'react';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import { useReport } from '@/hooks/common/useReport';
import { EMPTY_DATA } from '@/pages/admin/report/new/data';
import { NewReport } from '@/types/report';
import Form from './Form';
import Accordion from '../common/Accordion';

interface ReportEditProps {
  report?: [NewReport, NewReport];
}

function ReportEdit({ report }: ReportEditProps) {
  const createMutation = useNewReport();

  const {
    uploadFileOne,
    setUploadFileOne,
    uploadFileTwo,
    setUploadFileTwo,
    setReportOne,
    setReportTwo,
    reportOne,
    reportTwo,
  } = useReport(report ?? [EMPTY_DATA, EMPTY_DATA]);

  const handleClickModifyButton = () => {
    console.log();
  };

  const handleClickCreateButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
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
          />
        </Accordion>
        <Accordion title="활동2">
          <Form
            uploadFiles={uploadFileTwo}
            report={reportTwo}
            setValue={setReportTwo}
            setImage={setUploadFileTwo}
          />
        </Accordion>
        <div className="fixed bottom-4 right-4 md:mt-6">
          <button
            type="submit"
            className="mr-2 h-11 w-28 rounded-xl bg-blue-100 px-1 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base"
          >
            {report ? '수정하기' : '생성하기'}
          </button>
        </div>
      </form>
    </>
  );
}

export default ReportEdit;
