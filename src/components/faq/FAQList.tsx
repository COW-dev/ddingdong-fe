import { Trash2 } from 'lucide-react';
import { useCookies } from 'react-cookie';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useDeleteFaq } from '@/hooks/api/faq/useDeleteFaq';

interface FAQItem {
  question: string;
  reply: string;
  id?: number;
}

interface FAQListProps {
  FAQ: any;
  newFAQs: FAQItem[];
  setNewFAQs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  isEditing: boolean;
}

export default function FAQList({
  FAQ,
  newFAQs,
  setNewFAQs,
  isEditing,
}: FAQListProps) {
  const safeFAQ: FAQItem[] = Array.isArray(FAQ?.data) ? FAQ?.data : [];

  const [cookies] = useCookies(['token', 'role']);
  const { token } = cookies;

  const isClickedDeleteButton = (questionId?: number) => {
    if (!questionId) return;
    useDeleteFaq({ questionId, token });
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      {safeFAQ.length === 0 && newFAQs.length === 0 && (
        <div className="text-gray-500">등록된 게시물이 없습니다</div>
      )}

      {isEditing ? (
        <>
          {newFAQs.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger isArrow={false}>
                  <div className="">
                    <span>Q</span>
                    <span className="text-blue-500">.</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>

                  <input
                    className="w-11/12"
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
                    className="text-red-400"
                    onClick={() => isClickedDeleteButton(item.id)}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="font-bold text-blue-500">A.</div>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <input
                    className="w-full bg-gray-50"
                    placeholder={item.reply}
                    value={item.reply}
                    onChange={(e) =>
                      setNewFAQs((prev) =>
                        prev.map((faq, i) =>
                          i === index ? { ...faq, reply: e.target.value } : faq,
                        ),
                      )
                    }
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

          {safeFAQ.map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger isArrow={false}>
                  <div className="faq-question">
                    <span>Q</span>
                    <span className="text-blue-500">.</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span>{item.question}</span>
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
                <span>{item.question}</span>
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
  );
}
