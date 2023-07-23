import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Heading from '@/components/common/Heading';
import ReportList from '@/components/common/ReportList';
export default function Index() {
  const [report, setReport] = useState<number>(1);
  return (
    <>
      <Head>
        <title>띵동 일반동아리 - 활동보고서</title>
      </Head>
      <div className="flex flex-row items-end justify-between">
        <Heading>활동보고서 관리하기</Heading>
        <Link
          href="/notice/new"
          className="-mr-3 inline-block p-2 opacity-40 transition-opacity hover:opacity-70 sm:hidden"
        >
          {/* <Image
            src="/.svg"
            width={100}
            height={100}
            priority
            alt="new"
            className="w-5"
          ></Image> */}
        </Link>
      </div>
      <ReportList />
    </>
  );
}
