import { useState } from 'react';
import Head from 'next/head';
import { Trash2 } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { deleteFaq } from '@/apis';
import Heading from '@/components/common/Heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAllFaq } from '@/hooks/api/faq/useAllFaq';
import { useCreateFaq } from '@/hooks/api/faq/useCreateFaq';

interface FAQItem {
  question: string;
  reply: string;
}

export default function Index() {
  const [cookies] = useCookies(['token', 'role']);
  const { token } = cookies;

  const { data: FAQ, isLoading, error } = useAllFaq(token);
  const { mutate: createFaq, isLoading: isSaving } = useCreateFaq();
  console.log(FAQ?.data, 'FAQ');

  const [isEditing, setIsEditing] = useState(false);
  const [newFAQs, setNewFAQs] = useState<FAQItem[]>([]);

  const safeFAQ: FAQItem[] = Array.isArray(FAQ?.data) ? FAQ?.data : [];

  const addFAQ = () => {
    const newFAQ: FAQItem = {
      question: '질문을 입력해주세요',
      reply: '답변을 입력해주세요',
    };
    setNewFAQs([...newFAQs, newFAQ]);
  };

  const saveFAQ = () => {
    if (newFAQs.length === 0) {
      return;
    }

    newFAQs.forEach((faq) => {
      if (!faq.question || !faq.reply) {
        alert('질문과 답변 모두 입력부탁');
        return;
      }

      createFaq({ token, ...faq });
    });
  };

  const isClickedDeleteButton = (questionId: number) => {
    deleteFaq({ questionId, token });
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
              onClick={saveFAQ}
              className="ml-3 h-10 rounded-lg bg-blue-500 px-4.5 py-2 text-sm font-bold text-white hover:bg-blue-600"
              disabled={isSaving}
            >
              {isSaving ? '저장 중...' : '저장하기'}
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
        {safeFAQ.length === 0 && newFAQs.length === 0 && (
          <div className="text-gray-500">등록된 게시물이 없습니다</div>
        )}
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
                  <AccordionTrigger isArrow={false}>
                    <div>
                      <span>Q</span>
                      <span className="text-blue-500">.</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>

                    <input
                      className="mx-0 w-11/12 pr-10"
                      placeholder={item.question}
                      value={item.question}
                      onChange={(e) =>
                        setNewFAQs((prev) =>
                          prev.map((faq, i) =>
                            i === index
                              ? { ...faq, question: e.target.value }
                              : faq,
                          ),
                        )
                      }
                    />
                    <Trash2
                      className=" text-red-400"
                      onClick={() => isClickedDeleteButton(item.id)}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="font-bold text-blue-500">A.</div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <input
                      placeholder={item.reply}
                      className="w-full bg-gray-50"
                      value={item.reply}
                      onChange={(e) =>
                        setNewFAQs((prev) =>
                          prev.map((faq, i) =>
                            i === index
                              ? { ...faq, reply: e.target.value }
                              : faq,
                          ),
                        )
                      }
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
            {safeFAQ.map((item, index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger isArrow={false}>
                    <div>
                      <span>Q</span>
                      <span className="text-blue-500">.</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span className="text-left">{item.question}</span>
                    </div>

                    <Trash2
                      className="text-red-400"
                      onClick={() => isClickedDeleteButton(item.id)}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="font-bold text-blue-500">A.</div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {item.reply}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </>
        ) : (
          safeFAQ.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger>
                  <span>Q</span>
                  <span className="text-blue-500">.</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span className="text-left">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="font-bold text-blue-500">A.</div>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  {item.reply}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </>
  );
}
