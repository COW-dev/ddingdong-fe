import { useState } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useAllReports } from '@/hooks/api/club/useAllReports';
import { AllReport } from '@/types';

export const reports = [
  {
    name: 'cow',
    term: '1',
  },
  {
    name: 'cow',
    term: '2',
  },
  {
    name: 'cow',
    term: '4',
  },
];

export default function ReportList() {
  const [club, setClub] = useState('cow');
  const termList = Array.from({ length: 7 }, (_, i) => `${i + 1}`);
  const currentTerm = 5;
  const [cookies] = useCookies(['token']);
  const [allReports, setAllReport] = useState<Array<AllReport>>([]);
  const { data } = useAllReports(cookies.token);

  const submitTerms = reports
    .filter((item) => item.name === club)
    .map((item) => item.term);

  const isReports = reports
    .filter((item) => Number(item.term) <= currentTerm)
    .map((item) => item.term);

  return (
    <>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {termList.map((item) => {
            return (
              <div
                key={item}
                className={`mb-3 ${
                  Number(item) > currentTerm && !submitTerms.includes(item)
                    ? 'pointer-events-none cursor-not-allowed text-gray-200'
                    : ''
                }`}
              >
                {isReports.includes(item) ? (
                  <Link href={`/report/${item}`}>
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
                      Number(item) === currentTerm &&
                      !submitTerms.includes(item)
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
                          {Number(item) >= currentTerm &&
                          !submitTerms.includes(item) ? (
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
