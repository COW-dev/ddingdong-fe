import { useState } from 'react';

import { EditReport, SubmitReport } from '@/types/report';
import { parseNewReportToReport } from '@/utils/parse';

export function useReport(initReport: [EditReport, EditReport]) {
  const [reportOne, setReportOne] = useState<EditReport>(initReport[0]);
  const [reportTwo, setReportTwo] = useState<EditReport>(initReport[1]);
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);

  const createPairReport = (term: number): [SubmitReport, SubmitReport] => {
    const parseReportOne = parseNewReportToReport(term, reportOne);
    const parseReportTwo = parseNewReportToReport(term, reportTwo);

    return [parseReportOne, parseReportTwo];
  };

  return {
    createPairReport,
    reportOne,
    reportTwo,
    uploadFileOne,
    setUploadFileOne,
    uploadFileTwo,
    setUploadFileTwo,
    setReportOne,
    setReportTwo,
  };
}
