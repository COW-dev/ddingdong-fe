import React from 'react';
import { useReport } from '@/hooks/common/useReport';
import { NewReport } from '@/types/report';
import Form from './Form';
import Accordion from '../common/Accordion';

interface ReportWriteProps {
  report: [NewReport, NewReport];
}

function ReportWrite({ report }: ReportWriteProps) {
  const [reportOne, reportTwo] = report;

  const {
    uploadFileOne,
    setUploadFileOne,
    uploadFileTwo,
    setUploadFileTwo,
    setReportOne,
    setReportTwo,
  } = useReport(report);

  return (
    <>
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
    </>
  );
}

export default ReportWrite;
