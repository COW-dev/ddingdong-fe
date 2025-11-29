'use client';
import {
  Accordion,
  AccordionItem,
  Body3,
  Caption1,
  Flex,
} from 'ddingdong-design-system';

import { ReportAPIResponse } from '@/app/_api/types/report';
import { Report } from '@/app/admin/report/[term]/[name]/_components/Report';

export function ReportBundle({
  reports,
}: {
  reports: [ReportAPIResponse, ReportAPIResponse];
}) {
  if (!reports) return <NoReportMessage />;

  return (
    <Accordion
      defaultValue={['1', '2']}
      type="multiple"
      className="mt-5 md:mt-10"
    >
      <AccordionItem value="1" trigger={<Body3>활동1</Body3>}>
        <Report report={reports[0]} />
      </AccordionItem>
      <AccordionItem value="2" trigger={<Body3>활동2</Body3>}>
        <Report report={reports[1]} />
      </AccordionItem>
    </Accordion>
  );
}

function NoReportMessage() {
  return (
    <Flex
      dir="col"
      justifyContent="center"
      alignItems="center"
      className="h-60"
    >
      <Caption1 className="text-gray-400">
        제출된 활동보고서 내역이 없습니다.
      </Caption1>
    </Flex>
  );
}
