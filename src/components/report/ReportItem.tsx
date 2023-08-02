import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Detail from '@/components/report/detail/index';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { ReportDetail } from '@/types/report';

type Props = {
  name: string;
  term: number;
};
export default function ReportItem({ name, term }: Props) {
  const [{ token }] = useCookies(['token']);
  const reportDataList = useReportInfo({ name, term, token }).data;
  const [reportData, setReportData] = useState<ReportDetail[]>([]);
  useEffect(() => {
    if (reportDataList?.data) {
      setReportData(reportDataList.data);
    }
  }, [reportDataList?.data]);

  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 확인하기</title>
      </Head>
      <div className="flex flex-col justify-between md:flex-row md:items-end">
        <Heading>활동 보고서 확인하기</Heading>
        <span className="md:text-md mt-3 text-base">
          제출일시 {reportData[0]?.createdAt}
        </span>
      </div>
      {/* <div className="mt-3 flex flex-row space-x-2 text-base font-semibold text-gray-500">
        <span>{name}</span>
      </div> */}
      <div className="mt-5 w-full md:mt-10">
        <Accordion title="활동1">
          <Detail reportData={reportData[0]} />
        </Accordion>
        <Accordion title="활동2">
          <Detail reportData={reportData[1]} />
        </Accordion>
      </div>
    </>
  );
}
