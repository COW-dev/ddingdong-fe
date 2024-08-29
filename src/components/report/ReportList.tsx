import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useMyAllReports } from '@/hooks/api/club/useMyAllReports';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { MyReportList } from '@/types/report';

export default function ReportList() {
  const termList = Array.from({ length: 7 }, (_, i) => `${i + 1}`);
  const [{ token }] = useCookies(['token']);
  const currentTermData = useCurrentReports(token).data?.data;
  const currentTerm = currentTermData?.term ?? 1;

  const {
    data: { data: clubData },
  } = useMyClub(token);
  const [club, setClub] = useState(clubData?.name);
  const { data: reportData } = useMyAllReports(token);
  const [myReportList, setMyReportList] = useState<Array<MyReportList>>(
    reportData?.data ?? [],
  );
  useEffect(() => {
    reportData && setMyReportList(reportData?.data);
    setClub(clubData?.name);
  }, [clubData?.name, reportData]);
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
          {termList.map((item) => {
            return (
              <div
                key={item}
                className={`mb-3 ${
                  Number(item) > Number(currentTerm) &&
                  !submitTerms?.includes(Number(item))
                    ? 'pointer-events-none cursor-not-allowed text-gray-200'
                    : ''
                }`}
              >
                {isReports?.includes(Number(item)) ? (
                  <Link href={`/report/${item}/${club}`}>
                    <div className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50">
                      <div className="flex h-full w-full items-center justify-between p-5 md:p-6">
                        <span className="text-lg font-bold md:text-xl">
                          {item}회차
                        </span>
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
                    href="/report/new"
                    data-item={item}
                    className={`${
                      Number(item) === Number(currentTerm) &&
                      !submitTerms?.includes(Number(item))
                        ? 'cursor-pointer'
                        : 'pointer-events-none cursor-not-allowed'
                    }`}
                  >
                    <div className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50">
                      <div className="flex h-full w-full items-center justify-between p-5 md:p-6">
                        <span className="text-lg font-bold md:text-xl">
                          {item}회차
                        </span>
                        <div className="flex items-center">
                          {Number(item) >= Number(currentTerm) &&
                          !submitTerms?.includes(Number(item)) ? (
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
