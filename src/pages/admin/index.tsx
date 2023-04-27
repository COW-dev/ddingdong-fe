import Head from 'next/head';
import Link from 'next/link';
import AdminHeading from '@/components/admin/AdminHeading';
import { NoticeType } from '@/types';

const notices: Array<NoticeType> = [
  {
    id: 0,
    title: '숨은 정부지원금 찾기의 알림 서비스 종료 안내',
    createdAt: '2022. 12. 13',
  },
  {
    id: 1,
    title: '환전 서비스 환율 우대 정책 변경 안내',
    createdAt: '2022. 12. 09',
  },
  {
    id: 2,
    title: 'ATM 출금 수수료 지원 종료 안내',
    createdAt: '2022. 12. 01',
  },
  {
    id: 3,
    title: '금융정보 이용약관 변경 안내',
    createdAt: '2022. 11. 23',
  },
  {
    id: 4,
    title: '숨은 정부지원금 찾기의 알림 서비스 종료 안내',
    createdAt: '2022. 11. 13',
  },
  {
    id: 5,
    title: '환전 서비스 환율 우대 정책 변경 안내',
    createdAt: '2022. 11. 09',
  },
  {
    id: 6,
    title: '토스 금융정보 구독 서비스(금융팁) 이용약관 변경 안내',
    createdAt: '2022. 11. 01',
  },
  {
    id: 7,
    title: 'ATM 출금 수수료 지원 종료 안내',
    createdAt: '2022. 10. 23',
  },
];

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 어드민</title>
      </Head>
      <AdminHeading clubName={'공:존'} clubScore={120} />
      <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <Link
          href="/club"
          className="inline-block min-h-[7rem] w-full rounded-xl border-[1.5px] px-6 py-5 transition-colors hover:border-gray-300 hover:bg-gray-50 md:min-h-[8.5rem] md:px-8 md:py-7"
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
      <div className="mt-4 w-full rounded-xl border-[1.5px] px-6 py-5 md:mt-8 md:px-8 md:py-7">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">공지사항 관리하기</h2>
          <Link
            href="/notice"
            className="-mr-1 inline-block p-1 text-sm font-semibold text-gray-400 transition-colors hover:text-blue-500 md:text-base"
          >
            더 보기
          </Link>
        </div>
        <ul className="mt-6 w-full">
          {notices.slice(0, 5).map((item) => (
            <li key={item.id} className="w-full border-b">
              <Link
                href={`/notice/${item.id}`}
                className="flex flex-col justify-between py-5 text-base font-medium transition-opacity hover:opacity-50 md:flex-row md:items-end md:py-5 md:text-lg"
              >
                <div className="block font-semibold sm:hidden">
                  {item.title.length < 21
                    ? item.title
                    : item.title.substring(0, 21) + '..'}
                </div>
                <div className="hidden font-semibold sm:block">
                  {item.title}
                </div>
                <div className="text-sm text-gray-400 md:text-right md:text-base">
                  {item.createdAt}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
