import { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next/types';
import { useCookies } from 'react-cookie';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Detail from '@/components/report/detail/index';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useDeleteReport } from '@/hooks/api/club/useDeleteReport';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useReportInfo } from '@/hooks/api/club/useReportInfo';
import { cn } from '@/lib/utils';
import { ReportDetail } from '@/types/report';

type ReportDetailProps = {
  term: number;
  name: string;
};

export default function Index({ term, name }: ReportDetailProps) {
  const [{ token }] = useCookies(['token']);
  const currentTermData = useCurrentReports(token).data?.data.term ?? 1;
  const { data: clubData } = useMyClub(token);
  const deleteMutation = useDeleteReport();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const reportDataList = useReportInfo({ term, name, token }).data;
  const [reportData, setReportData] = useState<ReportDetail[]>([]);
  const [updateFileOne, setUpdateFileOne] = useState<File | null>(null);
  const [updateFileTwo, setUpdateFileTwo] = useState<File | null>(null);
  useEffect(() => {
    if (reportDataList?.data) {
      setReportData([reportDataList.data[0], reportDataList.data[1]]);
    }
  }, [reportDataList]);
  if (reportData.length === 0) return;

  function handleClickDelete() {
    deleteMutation.mutate({
      term,
      token: token,
    });
  }

  function handleClickModify() {
    // redirect('/report/new');
  }

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
      <div className="mt-3 flex flex-row space-x-2 text-base font-semibold text-gray-500">
        <span>{name}</span>
        <span>|</span>
        <span>{clubData?.leader}</span>
      </div>
      <div className="mt-5 w-full md:mt-10">
        <Accordion title="활동1">
          <Detail
            reportData={{
              ...reportData[0],
            }}
            setReportData={setReportData}
            isEditing={isEditing}
            image={updateFileOne}
            setImage={setUpdateFileOne}
          />
        </Accordion>
        <Accordion title="활동2">
          <Detail
            reportData={{
              ...reportData[1],
            }}
            setReportData={setReportData}
            isEditing={isEditing}
            image={updateFileTwo}
            setImage={setUpdateFileTwo}
          />
        </Accordion>
      </div>
      <div className="fixed bottom-4 right-4 flex gap-2 md:mt-6">
        <button
          className={cn(
            `mb-4 min-w-fit rounded-xl bg-red-50 px-3.5 py-2 text-sm font-bold text-red-400 transition-colors`,
            'hover:bg-red-200 md:mb-2 md:px-4 md:py-2.5 md:text-base',
            6 !== Number(term) && `hidden`,
          )}
          onClick={handleClickDelete}
        >
          삭제
        </button>
        <button
          className={cn(
            `mb-4 min-w-fit rounded-xl bg-orange-50 px-3.5 py-2 text-sm font-bold text-orange-400 transition-colors`,
            'hover:bg-orange-200 md:mb-2 md:px-4 md:py-2.5 md:text-base',
            6 !== Number(term) && `hidden`,
          )}
          onClick={handleClickDelete}
        >
          수정
        </button>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { term, name } = context.query;
  return {
    props: {
      term: term,
      name: name,
    },
  };
};
