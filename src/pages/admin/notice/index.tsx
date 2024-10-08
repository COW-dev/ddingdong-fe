import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Write from '@/assets/write.svg';
import Heading from '@/components/common/Heading';
import NoticeList from '@/components/common/NoticeList';
import { ROLE_TYPE } from '@/constants/text';

export default function Index() {
  const [{ role }] = useCookies(['role']);
  return (
    <>
      <Head>
        <title>띵동 어드민 - 공지사항</title>
      </Head>
      <div className="flex flex-row items-end justify-between">
        <Heading>
          공지사항
          <span className={role === ROLE_TYPE.ROLE_CLUB ? 'hidden' : 'ml-1'}>
            관리하기
          </span>
        </Heading>
        <Link
          href="/notice/new"
          className={`-mr-3 inline-block p-2 opacity-40 transition-opacity hover:opacity-70 sm:hidden ${
            role === ROLE_TYPE.ROLE_CLUB && 'invisible'
          }`}
        >
          <Image
            src={Write}
            width={100}
            height={100}
            priority
            alt="new"
            className="w-5"
          ></Image>
        </Link>
        <Link
          href="/notice/new"
          className={`-mb-0.5 hidden rounded-xl bg-blue-100 px-4 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base ${
            role === ROLE_TYPE.ROLE_CLUB && 'invisible'
          }`}
        >
          공지사항 작성하기
        </Link>
      </div>
      <NoticeList />
    </>
  );
}
