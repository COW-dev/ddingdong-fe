import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import ErrorImg from '@/assets/error-image.png';
import Accordion from '@/components/common/Accordion';
import Report from '@/components/report/detail/Report';
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

  if (reportData.length === 0)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center pt-14 md:pt-0">
        <Image priority src={ErrorImg} width={100} height={100} alt="error" />
        <span className="mt-10 opacity-80">활동보고서를 제출하지 않았어요</span>
      </div>
    );
  return (
    <>
      <div className="flex flex-1  justify-end">
        <span className="md:text-md mt-3 text-base">
          제출일시 {reportData[0]?.createdAt}
        </span>
      </div>
      <div className="mt-5 w-full md:mt-10">
        <Accordion title="활동1">
          <Report reportData={reportData[0]} term={term} />
        </Accordion>
        <Accordion title="활동2">
          <Report reportData={reportData[1]} term={term} />
        </Accordion>
      </div>
    </>
  );
}
