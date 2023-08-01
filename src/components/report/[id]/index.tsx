import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { GetServerSideProps } from 'next/types';
import Accordion from '@/components/common/Accordion';
import Detail from '@/components/report/Detail';
=======
import Head from 'next/head';
import { GetServerSideProps } from 'next/types';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Detail from '@/components/report/detail';
>>>>>>> feature
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { ReportDataType, ReportDetail } from '@/types/report';
import { dummy } from './data';
type ReportDetailProps = {
  term: number;
  club: string;
};

export default function Index({ term, club }: ReportDetailProps) {
  const [reportData, setReportData] = useState<Array<ReportDataType>>(dummy);

  return (
    <>
      <div>
        <div className="md:flex-end flex flex-col justify-between md:flex-row md:items-end">
          <div className="text-md mt-3 flex flex-col space-x-2 font-semibold ">
            <div className="m-2 text-xl">
              <span>{reportData[0].name}</span>
              <span className="mx-2">-</span>
              <span>1 회차</span>
            </div>
            <div className="flex opacity-60">
              <span>{reportData[0].leader}</span>
              <span>|</span>
              <span>{reportData[0].leaderDepartment}</span>
            </div>
          </div>
          <span className="md:text-md ml-2  text-base text-gray-500">
            {reportData[0].createdAt}
          </span>
        </div>

        <div className="mt-5 w-full md:mt-10">
          <Accordion title="활동 1">
            {/* <Detail
              reportId={reportData[0].reportId}
              content={reportData[0].content}
              place={reportData[0].place}
              startDate={reportData[0].startDate}
              endDate={reportData[0].endDate}
              startTime={reportData[0].startTime}
              endTime={reportData[0].endTime}
              imageUrls={reportData[0].imageUrls}
              participants={reportData[0].participants}
            /> */}
          </Accordion>
          <Accordion title="활동 2">
            {/* <Detail
              reportId={reportData[1].reportId}
              content={reportData[1].content}
              place={reportData[1].place}
              startDate={reportData[1].startDate}
              endDate={reportData[1].endDate}
              startTime={reportData[1].startTime}
              endTime={reportData[1].endTime}
              imageUrls={reportData[1].imageUrls}
              participants={reportData[1].participants}
            /> */}
          </Accordion>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, item, name } = context.query;
  console.log(id, item, name);
  return {
    props: {
      id: id,
      item: item,
      name: name,
    },
  };
};
