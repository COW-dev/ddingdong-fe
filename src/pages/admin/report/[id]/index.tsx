import { useState, useEffect } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next/types';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Detail from '@/components/report/Detail';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { ReportDetail } from '@/types';
type ReportDetailProps = {
  reportId: number;
  name: string;
};

export default function Index({ reportId, name }: ReportDetailProps) {
  const [reportData, setReportData] = useState<ReportDetail>({
    reportId: reportId,
    createdAt: '2023.06.23.07:20',
    name: '동아리이름',
    leader: '김세빈',
    leaderDepartment: '융소',
    content: '내용',
    place: '장소',
    startDate: new Date(),
    endDate: new Date(),
    imageUrl: 'image',
    participants: [
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융합소프트웨어학부',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융합소프트웨어학부',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융합소프트웨어학부',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융합소프트웨어학부',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융합소프트웨어학부',
      },
    ],
  });
  const {
    data: { data },
  } = useReportInfo(reportId, name);

  useEffect(() => {
    if (data) {
      setReportData(data);
    }
  }, [data]);

  function handleClickCancel() {
    setReportData(data);
  }
  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 확인하기</title>
      </Head>
      <div className="flex flex-col md:items-end justify-between md:flex-row">
        <Heading>활동 보고서 확인하기</Heading>
        <span className="mt-3 text-sm md:text-base">
          제출일시 {reportData.createdAt}
        </span>
      </div>
      <div className="mt-3 flex flex-row space-x-2 text-base font-semibold text-gray-500">
        <span>{reportData.name}</span>
        <span>|</span>
        <span>{reportData.leader}</span>
        <span>|</span>
        <span>{reportData.leaderDepartment}</span>
      </div>
      <div className="mt-5 w-full md:mt-10">
        <Accordion title="활동1">
          <Detail
            reportId={reportData.reportId}
            content={reportData.content}
            place={reportData.place}
            startDate={reportData.startDate}
            endDate={reportData.endDate}
            imageUrl={reportData.imageUrl}
            participants={reportData.participants}
          />
        </Accordion>
        <Accordion title="활동2">
          <Detail
            reportId={reportData.reportId}
            content={reportData.content}
            place={reportData.place}
            startDate={reportData.startDate}
            endDate={reportData.endDate}
            imageUrl={reportData.imageUrl}
            participants={reportData.participants}
          />
        </Accordion>
      </div>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id, name } = context.query;
//   return {
//     props: {
//       reportId: id,
//       name: name,
//     },
//   };
// };
