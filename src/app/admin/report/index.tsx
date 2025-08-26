import Head from 'next/head';
import Heading from '@/components/common/Heading';
import ReportList from '@/components/report/ReportList';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 일반동아리 - 활동보고서</title>
      </Head>
      <div className="flex flex-row items-end justify-between">
        <Heading>활동 보고서 작성</Heading>
      </div>
      <ReportList />
    </>
  );
}
