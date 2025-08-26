import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import { BUTTON_TYPE } from '@/constants/recruitment_button';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useReportTerms } from '@/hooks/api/club/useReportTerms';
import { parseDate } from '@/utils/parse';

export default function Index() {
  const [{ token }] = useCookies(['token']);
  const currentTermData = useCurrentReports(token).data?.data;
  const currentTerm = Number(currentTermData?.term) ?? '8';
  const termList = useReportTerms(token).data?.data;

  const filterPeriod = (term: number) => {
    //  if (term > currentTerm) return BUTTON_TYPE.BEFORE;
    if (term === currentTerm) return BUTTON_TYPE.NOW;
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
          {termList?.map((item) => {
            const { term, startDate, endDate } = item;

            return (
              <div
                key={term}
                className={`mb-3 ${
                  filterPeriod(term) === BUTTON_TYPE.BEFORE &&
                  'pointer-events-none cursor-not-allowed text-gray-300'
                }`}
              >
                <Link href={`/report/admin/${term}`} data-item={term}>
                  <div className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50">
                    <div className="flex h-full w-full items-center justify-between p-5 md:p-6">
                      <div>
                        <span className="text-lg font-bold md:text-xl">
                          {term}회차
                        </span>
                        <div className="text-gray-400">
                          {parseDate(startDate)} - {parseDate(endDate)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`mx-1 rounded-lg p-2 text-sm font-semibold 
                            ${filterPeriod(term).color}
                            ${filterPeriod(term).background_color}
                          `}
                        >
                          {filterPeriod(term).text}
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
