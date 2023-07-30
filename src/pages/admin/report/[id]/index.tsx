import { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next/types';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
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

  // useEffect(() => {
  //   if (data) {
  //     setReportData(data);
  //   }
  // }, [data]);

  // function handleClickCancel() {
  //   setReportData(data);
  // }
  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 확인하기</title>
      </Head>
      <div className="flex flex-col justify-between md:flex-row md:items-end">
        <Heading>활동 보고서 확인하기</Heading>
        <span className="md:text-md mt-3 text-base">
          제출일시 {reportData[0].createdAt}
        </span>
      </div>
      <div className="mt-3 flex flex-row space-x-2 text-base font-semibold text-gray-500">
        <span>{reportData[0].name}</span>
        <span>|</span>
        <span>{reportData[0].leader}</span>
        <span>|</span>
        <span>{reportData[0].leaderDepartment}</span>
      </div>
      <div className="mt-5 w-full md:mt-10">
        <Accordion title="활동1">
          <Detail
            reportId={reportData[0].reportId}
            content={reportData[0].content}
            place={reportData[0].place}
            startDate={reportData[0].startDate}
            endDate={reportData[0].endDate}
            imageUrl={reportData[0].imageUrl}
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
            imageUrl={reportData[1].imageUrl}
            participants={reportData[1].participants}
          />
        </Accordion>
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
