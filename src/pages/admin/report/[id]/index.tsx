import { useState, useEffect } from 'react';
import Head from 'next/head';
import Heading from '@/components/common/Heading';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { ReportDetail } from '@/types';
type ReportDetailProps = {
  reportId: number;
};
export default function Index({ reportId }: ReportDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [reportData, setReportData] = useState<ReportDetail>({
    id: reportId,
    createdAt: '',
    name: '',
    leader: '',
    leaderDepartment: '',
    content: '',
    place: '',
    startDate: new Date(),
    endDate: new Date(),
    imageUrl: '',
    participants: [],
  });
  const {
    data: { data },
  } = useReportInfo(reportId);

  useEffect(() => {
    if (data) {
      setReportData(data);
    }
  }, [data]);

  function handleClickCancel() {
    setIsEditing(false);
    setReportData(data);
  }

  function handleClickEdit() {
    setIsEditing(true);
  }

  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 확인하기</title>
      </Head>
      <div className="flex flex-row items-end justify-between">
        <Heading>활동 보고서 확인하기</Heading>
      </div>
    </>
  );
}
