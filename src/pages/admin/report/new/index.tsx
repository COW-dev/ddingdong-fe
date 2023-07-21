import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Accordion from '@/components/common/Accordion';
import Heading from '@/components/common/Heading';
import Select from '@/components/common/Select';
import Form from '@/components/report/Form';
import { useNewReport } from '@/hooks/api/club/useNewReport';
import type { Report } from '@/types';

export default function Index() {
  const mutation = useNewReport();
  const [cookies] = useCookies(['token']);
  const term = [
    '1회차',
    '2회차',
    '3회차',
    '4회차',
    '5회차',
    '6회차',
    '7회차',
    '8회차',
  ];
  const [reportOne, setReportOne] = useState<Report>({
    date: { startDate: new Date(), endDate: new Date() },
    image: '',
    place: '',
    content: '',
    participants: [],
  });
  const [reportTwo, setReportTwo] = useState<Report>({
    date: { startDate: new Date(), endDate: new Date() },
    image: '',
    place: '',
    content: '',
    participants: [],
  });
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    return mutation.mutate({
      ...reportOne,
      ...reportTwo,
    });
  }

  return (
    <div className=" flex flex-row ">
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-end">
          <Heading>활동 보고서 작성하기</Heading>
          <div className=" ml-10 text-xl font-medium ">
            <Select>{term.map((item) => String(item))}</Select>
          </div>
        </div>
        <form className="mt-5 w-full md:mt-10" onSubmit={handleSubmit}>
          <Accordion title="활동1">
            <Form
              date={reportOne.date}
              image={reportOne.image}
              place={reportOne.place}
              content={reportOne.content}
              participants={reportOne.participants}
              setValue={setReportOne}
            />
          </Accordion>
          <Accordion title="활동2">
            <Form
              date={reportTwo.date}
              image={reportTwo.image}
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
      </div>
    </div>
  );
}
