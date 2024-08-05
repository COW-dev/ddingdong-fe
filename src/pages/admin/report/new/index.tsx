import Head from 'next/head';
import Heading from '@/components/common/Heading';
import ReportEdit from '@/components/report/ReportEdit';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 작성하기</title>
      </Head>
      <Heading>활동 보고서 작성하기</Heading>
      <ReportEdit />
    </>
  );
}
