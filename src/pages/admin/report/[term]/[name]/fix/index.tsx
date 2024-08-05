import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import ReportEdit from '@/components/report/ReportEdit';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { parseReportDetailToEditReport } from '@/utils/parse';

type ReportDetailProps = {
  term: number;
  name: string;
};

export default function Index({ term, name }: ReportDetailProps) {
  const [{ token }] = useCookies(['token']);
  const reportDataList = useReportInfo({ term, name, token }).data?.data;
  if (!reportDataList) return;

  const reportOne = parseReportDetailToEditReport(reportDataList[0], term);
  const reportTwo = parseReportDetailToEditReport(reportDataList[1], term);

  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 수정하기</title>
      </Head>
      <Heading>활동 보고서 수정하기</Heading>
      <ReportEdit report={[reportOne, reportTwo]} />
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
