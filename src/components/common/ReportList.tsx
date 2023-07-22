import { useState } from 'react';
import Link from 'next/link';
import type { ReportManagement } from '@/types';

export default function ReportList() {
  const dummyReport: ReportManagement = {
    id: 1,
    term: '1회차',
    submission: '07.28 16:40',
    isSubmit: true,
  };
  const dummyReport2: ReportManagement = {
    id: 2,
    term: '2회차',
    submission: '08.04 17:30',
    isSubmit: false,
  };
  const [reports, setReports] = useState<Array<ReportManagement>>([
    dummyReport,
    dummyReport2,
  ]);
  return (
    <>
      <div className="mt-12  w-full gap-4 sm:grid-cols-2 md:mt-14 md:gap-8">
        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {reports.map((report) => (
            <div key={report.id}>
              <Link
                href={report.isSubmit ? `/report/${report.id}` : '/report/new'}
                className="inline-block w-full pb-5 pt-3 transition-opacity hover:opacity-50 md:pt-3.5"
              >
                <div className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50">
                  <div className="flex h-full w-full items-center justify-between p-5 md:p-6">
                    <span className="text-lg font-bold md:text-xl">
                      {report.term}
                    </span>
                    <div className="flex items-center">
                      {report.isSubmit ? (
                        <div className="mx-1 rounded-lg  bg-green-100 p-2 text-sm font-semibold text-green-500">
                          제출완료
                        </div>
                      ) : (
                        <div className="mx-1 cursor-pointer rounded-lg bg-gray-100 p-2 text-sm font-semibold text-gray-500">
                          제출하기
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
