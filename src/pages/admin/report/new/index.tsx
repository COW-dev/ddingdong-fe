import { useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Form from '@/components/report/Form';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import { NewReport } from '@/types/report';
import { parseDateToString } from '@/utils/parse';
import { isMissingData } from '@/utils/validator';

export default function Index() {
  const [{ token }] = useCookies();
  const currentTerm: number = useCurrentReports(token).data?.data.term ?? 1;
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);
  const mutation = useNewReport();
  const init = {
    term: currentTerm,
    date: { startDate: new Date(), endDate: new Date() },
    place: '',
    startTime: '',
    endTime: '',
    uploadFiles: null,
    content: '',
    participants: [
      {
        name: '',
        studentId: '60201111',
        department: '융합소프트웨어학부',
      },
      {
        name: '',
        studentId: '60201111',
        department: '철학과',
      },
      {
        name: '',
        studentId: '60201111',
        department: '융합소프트웨어학부',
      },
      {
        name: '',
        studentId: '60201111',
        department: '경영학과',
      },
      {
        name: '',
        studentId: '60201111',
        department: '중어중문학과',
      },
    ],
  };
  const [reportOne, setReportOne] = useState<NewReport>(init);
  const [reportTwo, setReportTwo] = useState<NewReport>(init);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reportOnedate =
      parseDateToString(new Date(String(reportOne.date.startDate))) + ' ';
    const reportTwodate =
      parseDateToString(new Date(String(reportOne.date.startDate))) + ' ';
    const reportData = [
      {
        term: reportOne.term,
        startDate: reportOnedate + reportOne.startTime,
        endDate: reportOnedate + reportOne.endTime,
        place: reportOne.place,
        content: reportOne.content,
        participants: reportOne.participants,
      },
      {
        term: reportTwo.term,
        startDate: reportTwodate + reportTwo.startTime,
        endDate: reportTwodate + reportTwo.endTime,
        place: reportTwo.place,
        content: reportTwo.content,
        participants: reportTwo.participants,
      },
    ];

    if (
      isMissingData({
        ...reportData[0],
      }) ||
      isMissingData({
        ...reportData[1],
      }) ||
      !uploadFileOne ||
      !uploadFileTwo
    )
      return toast.error('작성하지 않은 항목이 존재합니다.');
    const formData = new FormData();
    formData.append(
      'reportData',
      new Blob([JSON.stringify(reportData)], { type: 'application/json' }),
    );
    uploadFileOne &&
      formData.append('uploadFiles', uploadFileOne, `uploadFiles`);
    uploadFileTwo &&
      formData.append('uploadFiles', uploadFileTwo, `uploadFiles`);
    formData.append('token', token);
    return mutation.mutate(formData);
  }
  return (
    <>
      <Head>
        <title>띵동 일반 동아리 - 활동보고서 작성하기</title>
      </Head>
      <div className="flex flex-row items-end ">
        <Heading>활동 보고서 작성하기</Heading>
        <div className="ml-auto text-xl font-medium md:ml-10 "></div>
      </div>
      <form className="mt-5 w-full md:mt-10 " onSubmit={handleSubmit}>
        <Accordion title="활동1">
          <Form
            date={reportOne.date}
            uploadFiles={uploadFileOne}
            place={reportOne.place}
            startTime={reportOne.startTime}
            endTime={reportOne.endTime}
            content={reportOne.content}
            participants={reportOne.participants}
            setValue={setReportOne}
            setImage={setUploadFileOne}
          />
        </Accordion>
        <Accordion title="활동2">
          <Form
            date={reportTwo.date}
            uploadFiles={uploadFileTwo}
            place={reportTwo.place}
            startTime={reportTwo.startTime}
            endTime={reportTwo.endTime}
            content={reportTwo.content}
            participants={reportTwo.participants}
            setValue={setReportTwo}
            setImage={setUploadFileTwo}
          />
        </Accordion>
        <div className=" fixed bottom-4 right-4 md:mt-6">
          <button
            type="submit"
            className="mr-2 h-11 w-28 rounded-xl bg-blue-100 px-1 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base"
          >
            제출하기
          </button>
        </div>
      </form>
    </>
  );
}
