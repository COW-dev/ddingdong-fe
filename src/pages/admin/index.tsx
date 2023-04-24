import Head from 'next/head';
import Link from 'next/link';
import AdminHeading from '@/components/admin/AdminHeading';
import { NoticeType } from '@/types';

const notices: Array<NoticeType> = [
  {
    id: 0,
    title: '숨은 정부지원금 찾기의 알림 서비스 종료 안내',
    date: '2022. 12. 13',
  },
  {
    id: 1,
    title: '환전 서비스 환율 우대 정책 변경 안내',
    date: '2022. 12. 09',
  },
  {
    id: 2,
    title: 'ATM 출금 수수료 지원 종료 안내',
    date: '2022. 12. 01',
  },
  {
    id: 3,
    title: '금융정보 이용약관 변경 안내',
    date: '2022. 11. 23',
  },
  {
    id: 4,
    title: '숨은 정부지원금 찾기의 알림 서비스 종료 안내',
    date: '2022. 11. 13',
  },
  {
    id: 5,
    title: '환전 서비스 환율 우대 정책 변경 안내',
    date: '2022. 11. 09',
  },
  {
    id: 6,
    title: '토스 금융정보 구독 서비스(금융팁) 이용약관 변경 안내',
    date: '2022. 11. 01',
  },
  {
    id: 7,
    title: 'ATM 출금 수수료 지원 종료 안내',
    date: '2022. 10. 23',
  },
];

export default function Index() {
  return (
    <>
      <Head>
        <title>띵동 - 관리자 홈</title>
      </Head>
      <AdminHeading clubName={'공:존'} />
      <div className="mt-12 grid w-full max-w-[50rem] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <Link
          href="/clubs"
          className="inline-block min-h-[8rem] w-full max-w-sm rounded-xl border-[1.5px] p-5 hover:border-gray-200 hover:bg-gray-50 md:min-h-[9.5rem] md:p-8"
        >
          <h2 className="text-xl font-bold md:text-2xl">동아리 관리하기</h2>
          <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:text-base md:leading-tight">
            <p>신규 중앙 동아리를 등록하거나,</p>
            <p>기존의 동아리를 삭제해요.</p>
          </div>
        </Link>
        <Link
          href="/reports"
          className="inline-block min-h-[8rem] w-full max-w-sm rounded-xl border-[1.5px] p-5 hover:border-gray-200 hover:bg-gray-50 md:min-h-[9.5rem] md:p-8"
        >
          <h2 className="text-xl font-bold md:text-2xl">활동보고서 확인하기</h2>
          <div className="mt-2 text-sm font-semibold leading-tight text-gray-400 md:text-base md:leading-tight">
            <p>모든 동아리의 활동보고서를 확인해요.</p>
          </div>
        </Link>
      </div>
      <div className="mt-4 w-full rounded-xl border-[1.5px] p-5 md:mt-8 md:p-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">공지사항 관리하기</h2>
          <Link
            href="/notice"
            className="inline-block p-1 text-sm font-semibold text-gray-400 transition-colors hover:text-blue-500 md:text-base"
          >
            더 보기
          </Link>
        </div>
        <ul className="mt-6 w-full">
          {notices.slice(0, 5).map((item) => (
            <li key={item.id} className="w-full border-b">
              <Link
                href={`/notice/${item.id}`}
                className="flex flex-col justify-between py-5 text-base font-medium transition-opacity hover:opacity-40 md:flex-row md:items-center md:py-6 md:text-lg"
              >
                <div className="block font-semibold sm:hidden">
                  {item.title.length < 20
                    ? item.title
                    : item.title.substring(0, 20) + '..'}
                </div>
                <div className="hidden font-semibold sm:block">
                  {item.title}
                </div>
                <div className="text-sm text-gray-400 md:text-right md:text-base">
                  {item.date}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
