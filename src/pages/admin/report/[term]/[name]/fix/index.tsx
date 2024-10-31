import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import ReportEdit from '@/components/report/ReportEdit';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { ReportKey } from '@/types/report';
import { parseReportResponseToEditReport } from '@/utils/parse';

export default function Index({ term, name }: ReportKey) {
  const [{ token }] = useCookies(['token']);
  const reportDataList = useReportInfo({ term, name, token }).data?.data ?? [];
  if (reportDataList?.length === 0) return <></>;
  const reportOne = parseReportResponseToEditReport(reportDataList[0], term);
  const reportTwo = parseReportResponseToEditReport(reportDataList[1], term);
  console.log(reportOne);

  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 수정하기</title>
      </Head>
      <Heading>활동 보고서 수정하기</Heading>
      <ReportEdit report={[reportOne, reportTwo]} term={Number(term)} />
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
