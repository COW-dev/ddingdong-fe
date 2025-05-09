import Head from 'next/head';

import Heading from '@/components/common/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAllFaq } from '@/hooks/api/faq/useAllFaq';

export default function Index() {
  const { data: FAQ } = useAllFaq();

  return (
    <>
      <Head>
        <title>띵동 - FAQ</title>
      </Head>
      <div className=" flex items-end justify-between ">
        <Heading>FAQ</Heading>
      </div>
      <div>
        <div className="mt-10 flex flex-col items-center justify-center">
          {FAQ?.data?.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  <span>Q</span>
                  <span className="text-blue-500">.</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="text-left">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <span className=" font-bold text-blue-500">A.</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  {item.reply}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
}
