import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import AdminHeading from '@/components/admin/AdminHeading';
import Slider from '@/components/common/Slider';
import { ROLE_TEXT, ROLE_TYPE } from '@/constants/text';
import { useAllNotices } from '@/hooks/api/notice/useAllNotices';

export default function Index() {
  const [hydrated, setHydrated] = useState(false);
  const [{ role, token }] = useCookies(['token', 'role']);
  const { data: noticedata } = useAllNotices();
  const [infoElement, setInfoElement] = useState(<></>);

  const notices = noticedata?.data;

  useEffect(() => {
    setHydrated(true);
    handleInfoElement();
  }, []);

  if (!hydrated) return null;
  if (!ROLE_TEXT[role]) return;

  function handleInfoElement() {
    if (role === ROLE_TYPE.ROLE_ADMIN) {
      setInfoElement(
        <div className="mt-7 text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
          <div className="md:mr-1.5">안녕하세요,</div>
          <span className="text-blue-500">공;존</span>
          <span className="ml-1 md:ml-1.5">님</span>
        </div>,
      );
    } else {
      setInfoElement(<AdminHeading />);
    }
  }
  return (
    <>
      <Head>
        <title>띵동 어드민</title>
      </Head>
      {infoElement}
      <div className="relative mt-7">
        <Link
          href="/banner"
          className={`absolute right-0 top-2 z-10 inline-block w-12 p-2 opacity-40 transition-opacity hover:opacity-70  ${
            role === ROLE_TYPE.ROLE_CLUB && 'invisible'
          }`}
        >
          <Image
            src="/write.svg"
            width={100}
            height={100}
            priority
            alt="banner"
            className="w-5"
          />
        </Link>
        <Slider />
      </div>

      <div className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:gap-8">
        <Link
          href={ROLE_TEXT[role].club.route}
          className="bg-b inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
        >
          <h2 className="text-xl font-bold md:text-2xl">
            {ROLE_TEXT[role].club.title}
          </h2>
          <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
            <p>{ROLE_TEXT[role].club.subtitle}</p>
          </div>
        </Link>
        <Link
          href={ROLE_TEXT[role].report.route}
          className="inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
        >
          <h2 className="text-xl font-bold md:text-2xl">
            {ROLE_TEXT[role].report.title}
          </h2>
          <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
            <p>{ROLE_TEXT[role].report.subtitle}</p>
          </div>
        </Link>
      </div>
      <div className="mt-4 w-full rounded-xl border-[1.5px] p-6 md:mt-8 md:p-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">
            {ROLE_TEXT[role].notice.title}
          </h2>
          <Link
            href={ROLE_TEXT[role].notice.route}
            // eslint-disable-next-line prettier/prettier
            className="-mr-1 inline-block p-1 text-sm font-semibold text-gray-400 transition-colors hover:text-blue-500 md:text-base"
          >
            더 보기
          </Link>
        </div>
        <ul className="mt-8 w-full md:mt-10">
          {notices?.slice(0, 5).map((notice) => (
            <li key={notice.id} className="mb-1 w-full border-b">
              <Link
                href={`/notice/${notice.id}`}
                className="inline-block w-full pb-4 pt-3 transition-opacity hover:opacity-50 md:pb-4.5 md:pt-3.5"
              >
                <div className="block text-base font-semibold sm:hidden">
                  {notice.title?.length < 21
                    ? notice?.title
                    : notice.title?.substring(0, 21) + '..'}
                </div>
                <div className="hidden text-lg font-semibold sm:block">
                  {notice.title}
                </div>
                <div className="mb-2 mt-0.5 text-sm font-medium text-gray-400 md:text-base">
                  {new Date(notice.createdAt).toLocaleDateString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
