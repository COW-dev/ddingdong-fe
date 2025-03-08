import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import AdminHeading from '@/components/admin/AdminHeading';
import Slider from '@/components/common/Slider';
import { ROLE_TEXT, ROLE_TYPE } from '@/constants/text';
import { useAllDocuments } from '@/hooks/api/document/useAllDocuments';
import { useAllNotices } from '@/hooks/api/notice/useAllNotices';

export default function Index() {
  const [hydrated, setHydrated] = useState(false);
  const [{ role }] = useCookies(['token', 'role']);
  const { data: noticeData } = useAllNotices(1);
  const { data: documentData } = useAllDocuments(1);
  const [infoElement, setInfoElement] = useState(<></>);
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token',
  ]);
  const removeTokens = () => {
    removeCookie('refresh_token', { domain: '.mju.ac.kr' });
    removeCookie('access_token', { domain: '.mju.ac.kr' });
  };

  useEffect(() => {
    if (cookies.refresh_token || cookies.access_token) {
      removeTokens();
    }
  }, [cookies.refresh_token, cookies.access_token]);

  const notices = noticeData?.data.notices.sort((a, b) => {
    return b.id - a.id;
  });

  const documents = documentData?.data?.documents?.sort((a, b) => {
    return b.id - a.id;
  });

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
          <span className="md:mr-1.5">안녕하세요, </span>
          <span className="text-blue-500">U:th</span>
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
      <div className="flex flex-row items-end justify-between">
        {infoElement}
      </div>
      <div className="relative mt-7">
        <Slider />
      </div>
      <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-3 md:mt-6 md:gap-5">
        <Link
          href={ROLE_TEXT[role].club.route}
          className=" inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
        >
          <h2 className="text-xl font-bold md:text-2xl">
            {ROLE_TEXT[role].club.title}
          </h2>
          <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
            <p>{ROLE_TEXT[role].club.subtitle}</p>
          </div>
        </Link>
        {role === ROLE_TYPE.ROLE_CLUB && ROLE_TEXT[role]?.member && (
          <Link
            href={ROLE_TEXT[role].feed.route}
            className=" inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
          >
            <h2 className="text-xl font-bold md:text-2xl">
              {ROLE_TEXT[role].feed.title}
            </h2>
            <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
              <p>{ROLE_TEXT[role].feed.subtitle}</p>
            </div>
          </Link>
        )}
        {role === ROLE_TYPE.ROLE_CLUB && ROLE_TEXT[role]?.member && (
          <Link
            href={ROLE_TEXT[role]?.member?.route ?? ''}
            className=" inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
          >
            <h2 className="text-xl font-bold md:text-2xl">
              {ROLE_TEXT[role]?.member?.title ?? ''}
            </h2>
            <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
              <p>{ROLE_TEXT[role]?.member?.subtitle ?? ''}</p>
            </div>
          </Link>
        )}
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
        {role === ROLE_TYPE.ROLE_CLUB && ROLE_TEXT[role].member && (
          <Link
            href={ROLE_TEXT[role]?.score?.route ?? ''}
            className=" inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
          >
            <h2 className="text-xl font-bold md:text-2xl">
              {ROLE_TEXT[role]?.score?.title ?? ''}
            </h2>
            <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
              <p>{ROLE_TEXT[role]?.score?.subtitle ?? ''}</p>
            </div>
          </Link>
        )}
        <Link
          href={ROLE_TEXT[role].fix.route}
          className="inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
        >
          <h2 className="text-xl font-bold md:text-2xl">
            {ROLE_TEXT[role].fix.title}
          </h2>
          <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
            <p>{ROLE_TEXT[role].fix.subtitle}</p>
          </div>
        </Link>
        {role === ROLE_TYPE.ROLE_CLUB && ROLE_TEXT[role].member && (
          <Link
            href={ROLE_TEXT[role]?.apply?.route ?? ' '}
            className="inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
          >
            <h2 className="text-xl font-bold md:text-2xl">
              {ROLE_TEXT[role]?.apply?.title}
            </h2>
            <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
              <p>{ROLE_TEXT[role]?.apply?.subtitle}</p>
            </div>
          </Link>
        )}
        {role === ROLE_TYPE.ROLE_ADMIN && (
          <Link
            href={ROLE_TEXT[role].documents.route ?? ''}
            className=" inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
          >
            <h2 className="text-xl font-bold md:text-2xl">
              {ROLE_TEXT[role].documents.title}
            </h2>
            <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
              <p>{ROLE_TEXT[role].documents.subtitle}</p>
            </div>
          </Link>
        )}
        {role === ROLE_TYPE.ROLE_ADMIN && (
          <Link
            href={ROLE_TEXT[role]?.FAQ?.route ?? ''}
            className=" inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
          >
            <h2 className="text-xl font-bold md:text-2xl">
              {ROLE_TEXT[role]?.FAQ?.title}
            </h2>
            <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
              <p>{ROLE_TEXT[role]?.FAQ?.subtitle}</p>
            </div>
          </Link>
        )}
        {role === ROLE_TYPE.ROLE_ADMIN && (
          <Link
            href={ROLE_TEXT[role]?.banner?.route ?? ''}
            className=" inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
          >
            <h2 className="text-xl font-bold md:text-2xl">
              {ROLE_TEXT[role]?.banner?.title ?? ''}
            </h2>
            <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
              <p>{ROLE_TEXT[role]?.banner?.subtitle ?? ''}</p>
            </div>
          </Link>
        )}
      </div>
      <div className="mt-4 w-full rounded-xl border-[1.5px] p-6 md:mt-8 md:p-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">
            {ROLE_TEXT[role].notice.title}
          </h2>
          <Link
            href={ROLE_TEXT[role].notice.route}
            className="-mr-1 inline-block p-1 text-sm font-semibold text-gray-400 transition-colors hover:text-blue-500 md:text-base"
          >
            더 보기
          </Link>
        </div>
        <ul className="mt-8 w-full md:mt-10">
          {notices
            ?.slice(0, 3)
            .splice(0)
            .map((notice) => (
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
      {role === ROLE_TYPE.ROLE_CLUB && ROLE_TEXT[role].member && (
        <div className="mt-4 w-full rounded-xl border-[1.5px] p-6 md:mt-8 md:p-8">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xl font-bold md:text-2xl">
              {ROLE_TEXT[role].documents.title}
            </h2>
            <Link
              href={ROLE_TEXT[role].documents.route}
              className="-mr-1 inline-block p-1 text-sm font-semibold text-gray-400 transition-colors hover:text-blue-500 md:text-base"
            >
              더 보기
            </Link>
          </div>
          <ul className="mt-8 w-full md:mt-10">
            {documents
              ?.slice(0, 3)
              .splice(0)
              .map((document) => (
                <li key={document.id} className="mb-1 w-full border-b">
                  <Link
                    href={`/documents`}
                    className="inline-block w-full pb-4 pt-3 transition-opacity hover:opacity-50 md:pb-4.5 md:pt-3.5"
                  >
                    <div className="block text-base font-semibold sm:hidden">
                      {document.title?.length < 21
                        ? document?.title
                        : document.title?.substring(0, 21) + '..'}
                    </div>
                    <div className="hidden text-lg font-semibold sm:block">
                      {document.title}
                    </div>
                    <div className="mb-2 mt-0.5 text-sm font-medium text-gray-400 md:text-base">
                      {new Date(document.createdAt).toLocaleDateString()}
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
