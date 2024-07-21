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
        <button className=" ml-3 h-10 cursor-pointer rounded-lg bg-blue-100 px-5 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:h-8 md:px-2 md:py-1">
          업로드
        </button>
      </div>
      <DocumentList />
    </>
  );
}
