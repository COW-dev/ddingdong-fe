import { useState } from 'react';
import { NewReport } from '@/types/report';

export function useReport(initReport: [NewReport, NewReport]) {
  const [report, setReport] = useState<[NewReport, NewReport]>(initReport);
  const [reportOne, setReportOne] = useState<NewReport>(initReport[0]);
  const [reportTwo, setReportTwo] = useState<NewReport>(initReport[1]);
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);
  return {
    reportOne,
    reportTwo,
    uploadFileOne,
    setUploadFileOne,
    uploadFileTwo,
    setUploadFileTwo,
    setReportOne,
    setReportTwo,
    report,
  };
}
