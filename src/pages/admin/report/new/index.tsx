import { useState } from 'react';
import Accordion from '@/components/common/Accordion';
import Select from '@/components/common/Select';
import Form from '@/components/report/Form';
import type { Report } from '@/types';

export default function Index() {
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

  return (
    <div className=" flex flex-row ">
      <div className="m-auto flex w-4/6 flex-col items-start justify-center">
        <div className=" flex flex-col items-start">
          <div className="flex flex-row items-end">
            <h1 className="mt-10 text-3xl font-bold md:mt-12 md:text-4xl">
              활동 보고서 작성하기
            </h1>
            <div className=" ml-10 text-xl font-medium ">
              <Select>{term.map((item) => String(item))}</Select>
            </div>
          </div>
        </div>
        <div className="mt-10 w-full">
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
        </div>
      </div>
      <div className=" fixed bottom-4 right-4 md:mt-6">
        <button
          type="submit"
          className="mr-2 h-11 w-28 rounded-xl bg-blue-100 px-1 py-2.5 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 sm:inline-block md:text-base"
        >
          제출하기
        </button>
        {/* <button
          type="submit"
          className=" h-12 w-20 rounded-xl bg-blue-100 font-bold text-blue-500 transition-colors md:w-auto md:px-2.5 md:py-2.5"
        >
          임시저장
        </button> */}
      </div>
    </div>
  );
}
