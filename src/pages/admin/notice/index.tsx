import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/common/Heading';
import NoticeList from '@/components/common/NoticeList';

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항</title>
      </Head>
      <div className="flex flex-row items-end justify-between">
        <Heading>공지사항 관리하기</Heading>
        <Link
          href="/notice/new"
          // eslint-disable-next-line prettier/prettier
          className="-mb-1.5 -mr-3 inline-block p-3 opacity-40 transition-opacity hover:opacity-70 sm:hidden"
        >
          <Image
            src="/write.svg"
            width={100}
            height={100}
            priority
            alt="new"
            className="w-6"
          ></Image>
        </Link>
        <Link
          href="/notice/new"
          // eslint-disable-next-line prettier/prettier
          className="-mb-1.5 hidden rounded-xl bg-gray-100 text-base font-bold text-gray-500 transition-colors hover:bg-gray-200 sm:inline-block sm:px-5 sm:py-3 md:-mb-1"
        >
          공지사항 작성하기
        </Link>
      </div>
      <NoticeList />
    </>
  );
}
