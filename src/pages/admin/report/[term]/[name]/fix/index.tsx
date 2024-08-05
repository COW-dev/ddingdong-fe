import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Heading } from 'lucide-react';
import { useCookies } from 'react-cookie';
import ReportWrite from '@/components/report/ReportWrite';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { ReportDetail } from '@/types/report';

type ReportDetailProps = {
  term: number;
  name: string;
};

export default function Index({ term, name }: ReportDetailProps) {
  const [{ token }] = useCookies(['token']);
  const reportDataList = useReportInfo({ term, name, token }).data;

  const filter = (reportItem?: ReportDetail) => {
    if (!reportItem) return;
    const { place, content, participants, startTime, endTime } = reportItem;
    return {
      term,
      place,
      content,
      // uploadFiles: File | null;
      participants,
    };
  };

  const handleClickModifyButton = () => {
    console.log('tnwjd');
  };

  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 작성하기</title>
      </Head>
      <div className="flex flex-row items-end ">
        <Heading>활동 보고서 작성하기</Heading>
        <div className="ml-auto text-xl font-medium md:ml-10 "></div>
      </div>
      <form
        className="mt-5 w-full md:mt-10 "
        onSubmit={handleClickModifyButton}
      >
        <ReportWrite
          report={[
            filter(reportDataList?.data[0]),
            filter(reportDataList?.data[1]),
          ]}
        />
        <div className=" fixed bottom-4 right-4 md:mt-6">
          <button
            type="submit"
            className="mr-2 h-11 w-28 rounded-xl bg-blue-100 px-1 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base"
          >
            수정하기
          </button>
        </div>
      </form>
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
