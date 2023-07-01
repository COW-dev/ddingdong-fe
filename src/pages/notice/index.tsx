import Head from 'next/head';
import Heading from '@/components/common/Heading';
import NoticeList from '@/components/common/NoticeList';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 - 공지사항</title>
      </Head>
      <Heading>공지사항</Heading>
      <NoticeList />
    </>
  );
}
