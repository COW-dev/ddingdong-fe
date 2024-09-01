import Head from 'next/head';
import { GetServerSideProps } from 'next/types';
import Heading from '@/components/common/Heading';
import ReportEdit from '@/components/report/ReportEdit';

type ReportPageType = {
  term: number;
};

export default function Index({ term }: ReportPageType) {
  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 작성하기</title>
      </Head>
      <Heading>활동 보고서 작성하기</Heading>
      <ReportEdit term={term} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { term } = context.query;
  return {
    props: {
      term: term,
    },
  };
};
