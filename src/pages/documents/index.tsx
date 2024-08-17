import Head from 'next/head';
import DocumentList from '@/components/common/DocumentList';
import Heading from '@/components/common/Heading';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 - 자료실</title>
      </Head>
      <div className=" flex items-end justify-between ">
        <Heading>자료실</Heading>
      </div>
      <DocumentList />
    </>
  );
}
