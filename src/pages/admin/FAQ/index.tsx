import { useState } from 'react';
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

export default function Index() {
  const [cookies, setCookie] = useCookies(['token', 'role']);
  const { role } = cookies;
  const [isEditing, setIsEditing] = useState(false);
  const [newFAQs, setNewFAQs] = useState([]);

  const addFAQ = () => {
    const newFAQ = { Q: '질문을 입력해주세요', A: '답변을 입력해주세요' };
    setNewFAQs([...newFAQs, newFAQ]);
  };

  return (
    <>
      <Head>
        <title>띵동 - FAQ</title>
      </Head>
      <div className="flex items-end justify-between">
        <Heading>FAQ 관리</Heading>
        {isEditing ? (
          <div>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-3 h-10 rounded-lg bg-gray-100 px-4.5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-3 h-10 rounded-lg bg-blue-500 px-4.5 py-2 text-sm font-bold text-white hover:bg-blue-600"
            >
              저장하기
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="ml-3 h-10 rounded-lg bg-blue-100 px-4.5 py-2 text-sm font-bold text-blue-500 hover:bg-blue-200"
          >
            수정하기
          </button>
        )}
      </div>
      {isEditing && (
        <div className="flex w-full justify-end pt-10">
          <div
            onClick={addFAQ}
            className="flex w-16 cursor-pointer justify-end border-b-2 border-gray-600 pb-0 font-bold text-gray-600"
          >
            FAQ 추가
          </div>
        </div>
      )}
      <div className="mt-10 flex flex-col items-center justify-center">
        {isEditing ? (
          <>
            {newFAQs.map((item, index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger trash={true}>
                    <span>Q</span>
                    <span className="text-blue-500">.</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input className="w-full" placeholder={item.Q} />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="font-bold text-blue-500">A.</div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input placeholder={item.A} className="w-full bg-gray-50" />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            {QnA.map((item, index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger trash={isEditing}>
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
          </>
        ) : (
          QnA.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger trash={isEditing}>
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
          ))
        )}
      </div>
    </>
  );
}
