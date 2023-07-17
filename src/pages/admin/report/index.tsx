import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import Arrow from '@/assets/arrow.svg';
import Accordion from '@/components/common/Accordion';
import Form from '@/components/report/Form';
import type { Report } from '@/types';

export default function Index() {
  const [reportOne, setReportOne] = useState<Report>({
    date: new Date,
    image: '',
    place: '',
    content: '',
    participants: [],
})
const [reportTwo, setReportTwo] = useState<Report>({
  date: new Date,
  image: '',
  place: '',
  content: '',
  participants: [],
})

  return (
    <div className=" flex flex-row ">
      <div className="w-4/6 m-auto flex flex-col justify-center items-start">
        <div className=" flex flex-col items-start">
          <div className="flex flex-row items-end">
            <h1 className="mt-10 text-3xl font-bold md:mt-12 md:text-4xl">
              활동 보고서 작성하기
            </h1>
            <div className=" ml-10 text-xl font-medium ">
              <span > 1 회차 </span>
            </div>
          </div>
        </div>
        <div className='w-full mt-10'>
          <Accordion title="활동1" >
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
          className=" w-20 h-12 rounded-xl mr-2 bg-blue-100 font-bold text-blue-500 transition-colors md:w-auto md:px-2.5 md:py-2.5"
        >
          제출하기
        </button>
        <button
          type="submit"
          className=" w-20 h-12 rounded-xl bg-blue-100 font-bold text-blue-500 transition-colors md:w-auto md:px-2.5 md:py-2.5"
        >
          임시저장
        </button>
      </div>
    </div>
  );
}
