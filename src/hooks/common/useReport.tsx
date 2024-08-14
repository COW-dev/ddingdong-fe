import { useState } from 'react';
import { useCookies } from 'react-cookie';
import UnSubmitImage from '@/assets/cry.png';
import { NewReport } from '@/types/report';
import { getBlobFromImageData, parseNewReportToReport } from '@/utils/parse';

export function useReport(initReport: [NewReport, NewReport]) {
  const [{ token }] = useCookies(['token']);

  const [reportOne, setReportOne] = useState<NewReport>(initReport[0]);
  const [reportTwo, setReportTwo] = useState<NewReport>(initReport[1]);
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);

  const [removeFileOne, setRemoveFileOne] = useState<boolean>(false);
  const [removeFileTwo, setRemoveFileTwo] = useState<boolean>(false);

  const createFormData = async (
    formData: FormData,
    term: number,
  ): Promise<FormData> => {
    const parseReportOne = parseNewReportToReport(term, reportOne);
    const parseReportTwo = parseNewReportToReport(term, reportTwo);
    uploadFileOne
      ? formData.append('uploadFiles1', uploadFileOne, `uploadFiles1`)
      : removeFileOne &&
        formData.append(
          'uploadFiles1',
          await getBlobFromImageData(UnSubmitImage),
          `uploadFiles1`,
        );
    uploadFileTwo
      ? formData.append('uploadFiles2', uploadFileTwo, `uploadFiles2`)
      : removeFileTwo &&
        formData.append(
          'uploadFiles2',
          await getBlobFromImageData(UnSubmitImage),
          `uploadFiles2`,
        );
    formData.append(
      'reportData',
      JSON.stringify([parseReportOne, parseReportTwo]),
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
    setRemoveFileOne,
    setRemoveFileTwo,
  };
}
