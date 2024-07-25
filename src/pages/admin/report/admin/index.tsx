import Head from 'next/head';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useReportTerms } from '@/hooks/api/club/useReportTerms';
import { cn } from '@/lib/utils';

export default function Index() {
  const [{ token }] = useCookies(['token']);
  const currentTermData = useCurrentReports(token).data?.data;
  const currentTerm = currentTermData?.term ?? 1;
  // const termList = useReportTerms().data?.data;
  const termList = [
    {
      term: 1, // 1회차
      startDay: '2024-03-01',
      endDay: '2024-03-14',
    },
    {
      term: 2, // 2회차
      startDay: '2024-03-15',
      endDay: '2024-03-28',
    }, // 10회차까지 제공(최대 20주 기준)
  ];

  const filterPeriod = (term: number) => {
    if (term >= currentTerm) return BUTTON_TYPE.BEFORE;
    else if (term === currentTerm) return BUTTON_TYPE.NOW;
    else return BUTTON_TYPE.AFTER;
  };

  function formatDate(date: string): string {
    const year = date.substring(2, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);

    return `${year}.${month}.${day}`;
  }

  const BUTTON_TYPE = {
    BEFORE: {
      text: '진행 전',
      color: 'text-gray-400',
      background_color: 'bg-gray-50',
    },
    NOW: {
      text: '진행 중',
      color: 'text-green-400',
      background_color: 'bg-green-50',
    },
    AFTER: {
      text: '마감',
      color: 'text-red-400',
      background_color: 'bg-red-50',
    },
  };

  return (
    <>
      <Head>
        <title>띵동 총동연 - 활동보고서</title>
      </Head>
      <div className="flex">
        <Heading>활동 보고서 관리</Heading>
      </div>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {termList?.map((item, index) => {
            return (
              <div
                key={index}
                className={`mb-3 ${
                  filterPeriod(Number(item)) === BUTTON_TYPE.BEFORE &&
                  'pointer-events-none cursor-not-allowed text-gray-300'
                }`}
              >
                <Link href={`/report/admin/${item.term}`} data-item={item}>
                  <div
                    className={`rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50`}
                  >
                    <div className="flex h-full w-full items-center justify-between p-5 md:p-6">
                      <div>
                        <span className="text-lg font-bold md:text-xl">
                          {item.term}회차
                        </span>
                        <div className="text-gray-400">
                          {formatDate(item.startDay)} -{' '}
                          {formatDate(item.endDay)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={cn(
                            'mx-1 rounded-lg p-2 text-sm font-semibold',
                            filterPeriod(Number(item)).color,
                            filterPeriod(Number(item)).background_color,
                          )}
                        >
                          {filterPeriod(Number(item)).text}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
