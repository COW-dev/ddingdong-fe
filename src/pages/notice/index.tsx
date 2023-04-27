import Head from 'next/head';
import Link from 'next/link';
import Heading from '@/components/common/Heading';
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
        <title>띵동 - 공지사항</title>
      </Head>
      <Heading>공지사항</Heading>
      <ul className="mt-8 w-full md:mt-12">
        {notices.map((notice) => (
          <li key={notice.id} className="w-full border-b">
            <Link
              href={`/notice/${notice.id}`}
              className="inline-block w-full py-6 transition-opacity hover:opacity-50"
            >
              <div className="block text-base font-semibold sm:hidden">
                {notice.title.length < 25
                  ? notice.title
                  : notice.title.substring(0, 25) + '..'}
              </div>
              <div className="hidden text-lg font-semibold sm:block">
                {notice.title}
              </div>
              <div className="text-sm font-medium text-gray-400 md:text-base">
                {notice.createdAt}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
