import Head from 'next/head';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useReportTerms } from '@/hooks/api/club/useReportTerms';
import { cn } from '@/lib/utils';
import { parseDate } from '@/utils/parse';
import { BUTTON_TYPE, termList } from './data';

export default function Index() {
  const [{ token }] = useCookies(['token']);
  const currentTermData = useCurrentReports(token).data?.data;
  const currentTerm = currentTermData?.term ?? 1;
  // const termList = useReportTerms().data?.data;

  const filterPeriod = (term: number) => {
    if (term >= currentTerm) return BUTTON_TYPE.BEFORE;
    else if (term === currentTerm) return BUTTON_TYPE.NOW;
    else return BUTTON_TYPE.AFTER;
  };

  return (
    <>
      <Head>
        <title>띵동 총동연 - 활동보고서</title>
      </Head>
      <Heading>활동 보고서 관리</Heading>
      <div className="mt-12 w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {termList?.map((item, index) => {
            const { term, startDay, endDay } = item;

            return (
              <div
                key={index}
                className={`mb-3 ${
                  filterPeriod(Number(item)) === BUTTON_TYPE.BEFORE &&
                  'pointer-events-none cursor-not-allowed text-gray-300'
                }`}
              >
                <Link href={`/report/admin/${term}`} data-item={item}>
                  <div
                    className={`rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50`}
                  >
                    <div className="flex h-full w-full items-center justify-between p-5 md:p-6">
                      <div>
                        <span className="text-lg font-bold md:text-xl">
                          {term}회차
                        </span>
                        <div className="text-gray-400">
                          {parseDate(startDay)} - {parseDate(endDay)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={cn(
                            'mx-1 rounded-lg p-2 text-sm font-semibold',
                            filterPeriod(Number(term)).color,
                            filterPeriod(Number(term)).background_color,
                          )}
                        >
                          {filterPeriod(Number(term)).text}
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
