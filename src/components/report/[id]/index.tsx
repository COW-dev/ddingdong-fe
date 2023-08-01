import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next/types';
import Accordion from '@/components/common/Accordion';
import Detail from '@/components/report/Detail';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { ReportDetail } from '@/types/report';
import { dummy } from './data';

type ReportDetailProps = {
  reportId: number;
  name: string;
};

export default function Index({ reportId, name }: ReportDetailProps) {
  const [reportData, setReportData] = useState<Array<ReportDetail>>(dummy);
  const {
    data: { data },
  } = useReportInfo(reportId, name);

  return (
    <>
      <div>
        <div className="md:flex-end flex flex-col justify-between md:flex-row md:items-end">
          <div className="text-md mt-3 flex flex-col space-x-2 font-semibold ">
            <div className="m-2 text-xl">
              <span>{reportData[0].name}</span>
            </div>
            <div className="flex opacity-60">
              <span>{reportData[0].leader}</span>
              <span>|</span>
              <span>{reportData[0].leaderDepartment}</span>
            </div>
          </div>
          <span className="md:text-md mt-3 text-base">
            제출일시 {reportData[0].createdAt}
          </span>
        </div>

        <div className="mt-5 w-full md:mt-10">
          <Accordion title="활동1">
            <Detail
              reportId={reportData[0].reportId}
              content={reportData[0].content}
              place={reportData[0].place}
              startDate={reportData[0].startDate}
              endDate={reportData[0].endDate}
              startTime={reportData[0].startTime}
              endTime={reportData[0].endTime}
              imageUrls={reportData[0].imageUrls}
              participants={reportData[0].participants}
            />
          </Accordion>
          <Accordion title="활동2">
            <Detail
              reportId={reportData[1].reportId}
              content={reportData[1].content}
              place={reportData[1].place}
              startDate={reportData[1].startDate}
              endDate={reportData[1].endDate}
              startTime={reportData[1].startTime}
              endTime={reportData[1].endTime}
              imageUrls={reportData[1].imageUrls}
              participants={reportData[1].participants}
            />
          </Accordion>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      reportId: id,
    },
  };
};
