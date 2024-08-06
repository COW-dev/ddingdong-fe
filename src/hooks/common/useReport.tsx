import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { NewReport } from '@/types/report';
import { parseNewReportToReport } from '@/utils/parse';

export function useReport(initReport: [NewReport, NewReport]) {
  const [{ token }] = useCookies(['token']);

  const [reportOne, setReportOne] = useState<NewReport>(initReport[0]);
  const [reportTwo, setReportTwo] = useState<NewReport>(initReport[1]);
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);

  const createFormData = (formData: FormData, term: number): FormData => {
    const parseReportOne = parseNewReportToReport(term, reportOne);
    const parseReportTwo = parseNewReportToReport(term, reportTwo);
    uploadFileOne &&
      formData.append('uploadFiles1', uploadFileOne, `uploadFiles1`);
    uploadFileTwo &&
      formData.append('uploadFiles2', uploadFileTwo, `uploadFiles2`);
    formData.append(
      'reportData',
      new Blob([JSON.stringify([parseReportOne, parseReportTwo])], {
        type: 'application/json',
      }),
    );
    formData.append('token', token);

    return formData;
  };

  return {
    createFormData,
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
