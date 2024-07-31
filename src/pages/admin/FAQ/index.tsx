import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ROLE_TYPE } from '@/constants/text';

export default function Index() {
  const [cookies] = useCookies(['token', 'role']);
  const { role } = cookies;

  const dummy = [
    { Q: '총동연 질문', A: '대답' },
    { Q: '준동아리', A: '대답' },
  ];
  console.log('Dummy data:', dummy);
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
          {dummy?.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>{item.Q}</AccordionTrigger>
                <AccordionContent>{item.A}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}
