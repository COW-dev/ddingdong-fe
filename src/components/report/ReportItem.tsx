import Image from 'next/image';
import ErrorImg from '@/assets/error-image.png';
import { Accordion, AccordionItem, Flex, Body3 } from 'ddingdong-design-system';
import Report from '@/app/admin/report/[term]/[name]/_components/Report';
import { ReportKey, TermReport } from '@/types/report';
import { reportQueryOptions } from '@/app/_api/queries/report';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ReportItem({ name, term }: ReportKey) {
  const { data: termreports } = useSuspenseQuery(
    reportQueryOptions.termReports(term),
  );
  function getClubIdByName(reports: TermReport[], name: string) {
    const club = reports.find((item) => item.club.name === name);
    return club ? club.club.id : 0;
  }

  const clubId = getClubIdByName(termreports ?? [], name);
  const { data: report } = useSuspenseQuery(
    reportQueryOptions.report(term, clubId),
  );

  if (!report)
    return (
      <Flex
        dir="col"
        justifyContent="center"
        alignItems="center"
        className="h-full w-full pt-14 md:pt-0"
      >
        <Image priority src={ErrorImg} width={100} height={100} alt="error" />
        <span className="mt-10 opacity-80">활동보고서를 제출하지 않았어요</span>
      </Flex>
    );

  return (
    <>
      <Flex justifyContent="end" className="flex-1">
        <Body3>제출일시 {report[0]?.createdAt}</Body3>
      </Flex>
      <Accordion className="mt-5 w-full md:mt-10">
        <AccordionItem value="1" trigger="활동1">
          <Report reportData={report[0]} term={term} />
        </AccordionItem>
        <AccordionItem value="2" trigger="활동2">
          <Report reportData={report[1]} term={term} />
        </AccordionItem>
      </Accordion>
    </>
  );
}
