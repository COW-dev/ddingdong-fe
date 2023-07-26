import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Form from '@/components/report/Form';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import { NewReport } from '@/types';

export default function Index() {
  const mutation = useNewReport();
  const [{ token }] = useCookies();
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);
  const [reportOne, setReportOne] = useState<NewReport>({
    term: '1',
    date: { startDate: new Date(), endDate: new Date() },
    place: '',
    uploadFiles: uploadFileOne,
    content: '',
    participants: [
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
    ],
  });
  const [reportTwo, setReportTwo] = useState<NewReport>({
    term: '1',
    date: { startDate: new Date(), endDate: new Date() },
    place: '',
    content: '',
    uploadFiles: uploadFileTwo,
    participants: [
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융소',
      },
    ],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    const reportData = [reportOne, reportTwo];
    formData.append('reportData', JSON.stringify(reportData));
    if (reportOne.uploadFiles) {
      formData.append('uploadFiles', reportOne.uploadFiles);
    }
    if (reportTwo.uploadFiles) {
      formData.append('uploadFiles', reportTwo.uploadFiles);
    }

    formData.append('token', token);
    console.log(reportData);
    console.log('uploadFileOne', reportOne.uploadFiles);
    console.log('파일', reportTwo.uploadFiles);
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
            date={reportTwo.date}
            uploadFiles={reportOne.uploadFiles}
            place={reportOne.place}
            content={reportOne.content}
            participants={reportOne.participants}
            setValue={setReportOne}
          />
        </Accordion>
        <Accordion title="활동2">
          <Form
            date={reportTwo.date}
            uploadFiles={reportTwo.uploadFiles}
            place={reportTwo.place}
            content={reportTwo.content}
            participants={reportTwo.participants}
            setValue={setReportTwo}
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
