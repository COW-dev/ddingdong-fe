import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useCookies } from 'react-cookie';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useDeleteFaq } from '@/hooks/api/faq/useDeleteFaq';
import useModal from '@/hooks/common/useModal';
import { FAQListProps, FAQItemId } from '@/types/faq';
import AlertDialog from '../common/AlertDialog';
import Modal from '../common/Modal';

export default function FAQList({
  setIsEditing,
  FAQ,
  newFAQs,
  setNewFAQs,
  isEditing,
}: FAQListProps) {
  const safeFAQ: FAQItemId[] = Array.isArray(FAQ?.data) ? FAQ?.data : [];
  const [{ token }] = useCookies(['token', 'role']);

  const { mutate: deleteFaq, isLoading } = useDeleteFaq();

  const { openModal, visible, closeModal, modalRef } = useModal();

  const [deleteQuestionId, setDeleteQuestionId] = useState<number | null>(null);

  const isClickedDeleteButton = (questionId: number) => {
    setDeleteQuestionId(questionId);
    openModal();
  };

  const confirmDelete = () => {
    deleteFaq({ questionId: deleteQuestionId!, token });
    setIsEditing(false);
    closeModal();
  };

  const cancelModal = () => {
    closeModal();
  };

  const deleteFromNewFAQs = (index: number) => {
    setNewFAQs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: 'question' | 'reply',
    value: string,
  ) => {
    setNewFAQs((prev) =>
      prev.map((faq, i) => (i === index ? { ...faq, [field]: value } : faq)),
    );
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      {safeFAQ.length === 0 && newFAQs.length === 0 && (
        <div className="text-gray-500">등록된 게시물이 없습니다</div>
      )}

      {isEditing ? (
        <>
          {newFAQs.slice().map((item, index) => (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger isArrow={false}>
                  <div>
                    <span>Q</span>
                    <span className="text-blue-500">.</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <input
                    className="mx-1 w-11/12 focus:border-none focus:outline-none"
                    placeholder="질문을 입력해주세요"
                    value={item.question}
                    onChange={(e) =>
                      handleChange(index, 'question', e.target.value)
                    }
                  />
                  <Trash2
                    className={`cursor-pointer text-red-400 ${
                      isLoading ? 'opacity-50' : ''
                    }`}
                    onClick={() => deleteFromNewFAQs(index)}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="font-bold text-blue-500">A.</div>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <textarea
                    className="w-full resize-none rounded-md border border-gray-200 bg-gray-50 p-2 focus:border focus:outline-none"
                    placeholder="답변을 입력해주세요"
                    value={item.reply}
                    rows={3}
                    onChange={(e) =>
                      handleChange(index, 'reply', e.target.value)
                    }
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          {safeFAQ
            .slice()
            .reverse()
            .map((item, index) => (
              <Accordion
                key={index}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger isArrow={false}>
                    <div className="faq-question">
                      <span>Q</span>
                      <span className="text-blue-500">.</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span>{item.question}</span>
                    </div>
                    <Trash2
                      className={'cursor-pointer text-red-400 '}
                      onClick={() => isClickedDeleteButton(item.id ?? 0)}
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
        safeFAQ
          .slice()
          .reverse()
          .map((item, index) => (
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

      <Modal
        visible={visible}
        closeModal={closeModal}
        closeButton={false}
        modalRef={modalRef}
      >
        <AlertDialog
          type="delete"
          onConfirm={confirmDelete}
          onCancel={cancelModal}
        />
      </Modal>
    </div>
  );
}
