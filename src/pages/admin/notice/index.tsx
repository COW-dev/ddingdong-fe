import Head from 'next/head';
import Heading from '@/components/common/Heading';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항</title>
      </Head>
      <Heading>공지사항 관리하기</Heading>
    </>
  );
}