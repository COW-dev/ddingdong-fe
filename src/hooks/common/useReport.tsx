import { useState } from 'react';
import { NewReport } from '@/types/report';

export function useReport(initReport: [NewReport, NewReport]) {
  const [report, serReport] = useState<[NewReport, NewReport]>(initReport);
  const [reportOne, reportTwo] = report;
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);

  const setReportOne = (newReport: NewReport) => {
    serReport([newReport, reportTwo]);
  };
  const setReportTwo = (newReport: NewReport) => {
    serReport([reportOne, newReport]);
  };

  return {
    report,
    uploadFileOne,
    setUploadFileOne,
    uploadFileTwo,
    setUploadFileTwo,
    setReportOne,
    setReportTwo,
  };
}
