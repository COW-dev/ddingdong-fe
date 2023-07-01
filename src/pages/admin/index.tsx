import Head from 'next/head';
import Link from 'next/link';
import AdminHeading from '@/components/admin/AdminHeading';
import { useAllNotices } from '@/hooks/useAllNotices';

export default function Index() {
  const { data } = useAllNotices();
  const notices = data?.data;

  return (
    <>
      <Head>
        <title>띵동 어드민</title>
      </Head>
      <AdminHeading clubName={'공:존'} clubScore={120} />
      <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <Link
          href="/club"
          className="bg-b inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
        >
          <h2 className="text-xl font-bold md:text-2xl">동아리 관리하기</h2>
          <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
            <p>동아리를 등록/삭제하거나,</p>
            <p>동아리 점수를 입력해요.</p>
          </div>
        </Link>
        <Link
          href="/report"
          className="inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
        >
          <h2 className="text-xl font-bold md:text-2xl">활동보고서 확인하기</h2>
          <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:mt-3 md:text-base md:leading-tight">
            <p>동아리가 제출한</p>
            <p>활동보고서를 확인해요.</p>
          </div>
        </Link>
      </div>
      <div className="mt-4 w-full rounded-xl border-[1.5px] p-6 md:mt-8 md:p-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">공지사항 관리하기</h2>
          <Link
            href="/notice"
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
                  {notice.title.length < 21
                    ? notice.title
                    : notice.title.substring(0, 21) + '..'}
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
