import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Form from '@/components/report/Form';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import Select from '@/hooks/common/Select';
import { NewReport } from '@/types/report';

export default function Index() {
  const [temp, setTemp] = useState({});
  const [{ token }] = useCookies();
  const [uploadFileOne, setUploadFileOne] = useState<File | null>(null);
  const [uploadFileTwo, setUploadFileTwo] = useState<File | null>(null);
  const mutation = useNewReport();
  const [reportOne, setReportOne] = useState<NewReport>({
    term: '2',
    date: { startDate: new Date(), endDate: new Date() },
    place: '',
    uploadFiles: uploadFileOne,
    content: '',
    participants: [],
  });
  const [reportTwo, setReportTwo] = useState<NewReport>({
    term: '2',
    date: { startDate: new Date(), endDate: new Date() },
    place: '',
    content: '',
    uploadFiles: uploadFileTwo,
    participants: [],
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    const reportData = [reportOne, reportTwo];
    // console.log(reportOne);
    setTemp({
      ...reportOne,
      endDate: reportOne.date.endDate,
      startDate: reportOne.date.startDate,
    });
    console.log(temp);
    const blob = new Blob([JSON.stringify(reportData)], {
      type: 'application/json',
    });
    formData.append('reportData', blob);
    formData.append('uploadFiles', [
      reportOne.uploadFiles,
      reportTwo.uploadFiles,
    ]);
    // formData.append('token', token);

    console.log(formData.get('reportData'));
    console.log(formData.get('uploadFiles'));

    // return mutation.mutate({ formData, token });
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
