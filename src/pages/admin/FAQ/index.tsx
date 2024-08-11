import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { QnA } from '@/constants/qna';
import { ROLE_TYPE } from '@/constants/text';

export default function Index() {
  const [cookies] = useCookies(['token', 'role']);
  const { role } = cookies;

  return (
    <>
      <Head>
        <title>띵동 - FAQ</title>
      </Head>
      <div className=" flex items-end justify-between ">
        <Heading>FAQ</Heading>
        <button
          className={` ${
            role === ROLE_TYPE.ROLE_CLUB && 'invisible'
          } ml-3 h-10 cursor-pointer rounded-lg bg-blue-100 px-4.5 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200`}
        >
          수정
        </button>
        <div className="flex items-center justify-center">
          {QnA?.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger className="flex text-left">
                  <span>Q</span>
                  <span className="text-blue-500">.</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="text-left">{item.Q}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="font-bold text-blue-500">A.</div>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  {item.A}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}
