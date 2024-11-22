import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useMyAllReports } from '@/hooks/api/club/useMyAllReports';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useReportTerms } from '@/hooks/api/club/useReportTerms';
import { MyReportList } from '@/types/report';
import { parseDate } from '@/utils/parse';

export default function ReportList() {
  const [{ token }] = useCookies(['token']);
  const currentTermData = useCurrentReports(token).data?.data;
  const currentTerm = currentTermData?.term ?? 8;
  const termList = useReportTerms(token).data?.data;

  const { data: clubData } = useMyClub(token);
  const [club, setClub] = useState(clubData?.data.name);
  const { data: reportData } = useMyAllReports(token);
  const [myReportList, setMyReportList] = useState<MyReportList[]>(
    reportData?.data ?? [],
  );

  useEffect(() => {
    reportData && setMyReportList(reportData?.data);
    setClub(clubData?.data.name);
  }, [clubData?.data.name, reportData]);

  const submitTerms = myReportList
    .filter((item) => item.name === club)
    .map((item) => item.term);
  const isReports = myReportList
    .filter((item) => Number(item.term) <= Number(currentTerm))
    .map((item) => Number(item.term));

  return (
    <>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {termList?.map((item) => {
            const { term, startDate, endDate } = item;

            return (
              <div
                key={term}
                className={`mb-3 ${
                  term > Number(currentTerm) && !submitTerms?.includes(term)
                    ? 'pointer-events-none cursor-not-allowed text-gray-200'
                    : ''
                }`}
              >
                {isReports?.includes(term) ? (
                  <Link href={`/report/${term}/${club}`}>
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
                          <div className="mx-1 rounded-lg bg-green-100 p-2 text-sm font-semibold text-green-500">
                            제출완료
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={`/report/${term}/new`}
                    data-item={term}
                    className={`${
                      term === Number(currentTerm) &&
                      !submitTerms?.includes(term)
                        ? 'cursor-pointer'
                        : 'pointer-events-none cursor-not-allowed'
                    }`}
                  >
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
                          {term >= Number(currentTerm) &&
                          !submitTerms?.includes(term) ? (
                            <div className="mx-1 rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-500">
                              제출하기
                            </div>
                          ) : (
                            <div className="mx-1 rounded-lg bg-red-50 p-2 text-sm font-semibold text-red-400">
                              미제출
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
