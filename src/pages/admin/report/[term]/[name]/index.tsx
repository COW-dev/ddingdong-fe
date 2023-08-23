import { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Detail from '@/components/report/detail/index';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { useUpdateReports } from '@/hooks/api/club/useUpdateReports';
import { ReportDetail } from '@/types/report';

type ReportDetailProps = {
  term: number;
  name: string;
};

export default function Index({ term, name }: ReportDetailProps) {
  const [{ token }] = useCookies(['token']);
  const {
    data: { data: clubData },
  } = useMyClub(token);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const updateMutation = useUpdateReports(term);
  const reportDataList = useReportInfo({ term, name, token }).data;
  const [reportData, setReportData] = useState<ReportDetail[]>([]);
  const [updateFileOne, setUpdateFileOne] = useState<File | null>(null);
  const [updateFileTwo, setUpdateFileTwo] = useState<File | null>(null);

  useEffect(() => {
    if (reportDataList?.data) {
      setReportData([reportDataList.data[0], reportDataList.data[1]]);
    }
  }, [reportDataList?.data]);
  console.log('reportdata1', setReportData);
  if (reportData.length === 0) return;

  function handleClickCancel() {
    setIsEditing(false);
    reportDataList &&
      setReportData([reportDataList.data[0], reportDataList.data[1]]);
  }
  console.log('report', reportDataList?.data);
  function handleClickSubmit() {
    setIsEditing(false);
    const formData = new FormData();
    formData.set(
      'reportData',
      new Blob([JSON.stringify(reportData)], { type: 'application/json' }),
    );
    updateFileOne && formData.set('uploadFiles', updateFileOne, `uploadFiles`);
    updateFileTwo && formData.set('uploadFiles', updateFileTwo, `uploadFiles`);
    formData.set('token', token);
    return updateMutation.mutate(formData);
  }

  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 확인하기</title>
      </Head>
      <div className="flex flex-col justify-between md:flex-row md:items-end">
        <Heading>활동 보고서 확인하기</Heading>
        <span className="md:text-md mt-3 text-base">
          제출일시 {reportData[0]?.createdAt}
        </span>
      </div>
      <div className="mt-3 flex flex-row space-x-2 text-base font-semibold text-gray-500">
        <span>{name}</span>
        <span>|</span>
        <span>{clubData?.leader}</span>
      </div>
      <div className="mt-5 w-full md:mt-10">
        <Accordion title="활동1">
          <Detail
            reportData={reportData[0]}
            setReportData={setReportData}
            isEditing={isEditing}
          />
        </Accordion>
        <Accordion title="활동2">
          <Detail
            reportData={reportData[1]}
            setReportData={setReportData}
            isEditing={isEditing}
          />
        </Accordion>
      </div>
      <div className=" fixed bottom-4 right-4 md:mt-6 ">
        {isEditing ? (
          <div className=" font-bold">
            <button
              className="mb-2 mr-1 rounded-xl bg-gray-100 px-3.5 py-2 text-sm text-gray-500 transition-colors hover:text-gray-600 md:mb-2 md:px-4 md:py-2.5 md:text-base"
              onClick={handleClickCancel}
            >
              취소
            </button>
            <button
              className="mb-2 ml-1 rounded-xl bg-blue-100 px-3.5 py-2 text-sm text-blue-500 transition-colors hover:text-blue-600 md:mb-2 md:px-4 md:py-2.5 md:text-base"
              onClick={handleClickSubmit}
            >
              확인
            </button>
          </div>
        ) : (
          <button
            className="mb-4 min-w-fit rounded-xl bg-blue-100 px-3.5 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:mb-2 md:px-4 md:py-2.5 md:text-base"
            onClick={() => setIsEditing(true)}
          >
            보고서 수정하기
          </button>
        )}
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { term, name } = context.query;
  return {
    props: {
      term: term,
      name: name,
    },
  };
};
