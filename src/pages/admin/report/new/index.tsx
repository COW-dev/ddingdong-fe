import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Form from '@/components/report/Form';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import Select from '@/hooks/common/useSelect';
import { NewReport } from '@/types/report';

export default function Index() {
  const [{ token }] = useCookies();
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);
  const mutation = useNewReport();
  const [reportOne, setReportOne] = useState<NewReport>({
    term: '1',
    date: { startDate: new Date(), endDate: new Date() },
    place: '',
    startTime: '',
    endTime: '',
    uploadFiles: uploadFileOne,
    content: '',
    participants: [],
  });
  const [reportTwo, setReportTwo] = useState<NewReport>({
    term: '1',
    date: { startDate: new Date(), endDate: new Date() },
    place: '',
    content: '',
    startTime: '',
    endTime: '',
    uploadFiles: uploadFileTwo,
    participants: [
      {
        name: '김세빈',
        studentId: 60211904,
        department: '융합소프트웨어학부',
      },
      {
        name: '김보겸',
        studentId: 60211614,
        department: '융합소프트웨어학부',
      },
      {
        name: '모유경',
        studentId: 60201034,
        department: '융합소프트웨어학부',
      },
      {
        name: '유원준',
        studentId: 60201664,
        department: '융합소프트웨어학부',
      },
      {
        name: '박수환',
        studentId: 60202904,
        department: '융합소프트웨어학부',
      },
    ],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reportData = [
      {
        term: reportOne.term,
        date: reportOne.date,
        // ' ' +
        // reportOne.startTime.toString() +
        // ' ' +
        // reportOne.endTime.toString(), // Convert date to ISO string
        place: reportOne.place,
        content: reportOne.content,
        participants: reportTwo.participants,
      },
      {
        term: reportTwo.term,
        date: reportTwo.date,
        // reportTwo.date.startDate +
        // ' ' +
        // reportTwo.startTime.toString() +
        // ' ' +
        // reportTwo.endTime.toString(), // Convert date to ISO string
        place: reportTwo.place,
        content: reportTwo.content,
        participants: reportTwo.participants,
      },
    ];
    const formData = new FormData();
    // const blob = new Blob([JSON.stringify(reportData)], {
    //   type: 'application/json',
    // });
    console.log(uploadFileOne);
    formData.append(
      'reportData',
      new Blob([JSON.stringify(reportData)], { type: 'application/json' }),
    );
    // console.log(formData.get('reportData'));
    // formData.append('reportData', blob);

    uploadFileOne &&
      formData.append('uploadFiles', uploadFileOne, `uploadFiles`);
    uploadFileTwo &&
      formData.append('uploadFiles', uploadFileTwo, `uploadFiles`);
    // const fileExtension = uploadFiles.blob.type.replace('image/', '');
    // if (reportOne.uploadFiles !== undefined) {
    //   formData.append('uploadFiles', reportOne.uploadFiles as File);
    // }
    // if (reportTwo.uploadFiles !== undefined) {
    //   formData.append('uploadFiles', reportTwo.uploadFiles as File);
    // }
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
            uploadFiles={reportOne.uploadFiles}
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
            uploadFiles={reportTwo.uploadFiles}
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
