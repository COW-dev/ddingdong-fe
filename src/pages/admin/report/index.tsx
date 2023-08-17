import { useState } from 'react';
import Head from 'next/head';
import Heading from '@/components/common/Heading';
import ReportList from '@/components/report/ReportList';
export default function Index() {
  const [report, setReport] = useState<number>(1);
  return (
    <>
      <Head>
        <title>띵동 일반동아리 - 활동보고서</title>
      </Head>
      <div className="flex flex-row items-end justify-between">
        <Heading>활동 보고서 관리하기</Heading>
      </div>
      <ReportList />
    </>
  );
}
