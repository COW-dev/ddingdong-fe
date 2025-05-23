import Image from 'next/image';
import { useCookies } from 'react-cookie';
import ErrorImg from '@/assets/error-image.png';
import Accordion from '@/components/common/Accordion';
import Report from '@/components/report/detail/Report';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { useTermReports } from '@/hooks/api/club/useTermReports';
import { ReportKey, TermReport } from '@/types/report';

export default function ReportItem({ name, term }: ReportKey) {
  const [{ token }] = useCookies(['token']);
  const termreports = useTermReports(term, token).data?.data;

  function getClubIdByName(reports: TermReport[], name: string) {
    const club = reports.find((item) => item.club.name === name);
    return club ? club.club.id : 0;
  }

  const clubId = getClubIdByName(termreports ?? [], name);
  const reportData = useReportInfo({ term, clubId, token }).data?.data;

  if (!reportData)
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
