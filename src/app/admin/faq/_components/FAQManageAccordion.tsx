'use client';

import { PropsWithChildren, useState } from 'react';

import {
  Accordion,
  Body1,
  Body2,
  Flex,
  AccordionItem,
  IconButton,
  usePortal,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { useDeleteFaq } from '@/app/_api/mutations/faq';
import { FAQ } from '@/app/_api/types/faq';
import { RoleType } from '@/constants/role';

import { DeleteModal } from './DeleteModal';

type FAQManageAccordionProps = {
  role: keyof RoleType;
  editMode: boolean;
  FAQs: FAQ[];
};

export function FAQManageAccordion({
  role,
  editMode,
  FAQs,
}: FAQManageAccordionProps) {
  const { mutate: deleteFaq } = useDeleteFaq();
  const { isOpen, openModal, closeModal } = usePortal();
  const [deleteFAQData, setDeleteFAQData] = useState<FAQ | null>(null);

  const handleOpenDeleteModal = (faq: FAQ) => {
    setDeleteFAQData(faq);
    openModal();
  };

  const handleDelete = () => {
    if (!deleteFAQData) return;
    deleteFaq(deleteFAQData.id, {
      onSuccess: () => {
        closeModal();
        toast.success('FAQ가 삭제되었습니다.');
      },
    });
  };

  return (
    <>
      <FAQContainer>
        <Accordion type="single" className="w-full">
          {[...FAQs].reverse().map((faq) => (
            <Flex
              key={faq.id}
              justifyContent="between"
              alignItems="center"
              className="w-full gap-2"
            >
              <div className="min-w-0 flex-1">
                <AccordionItem
                  value={`item-${faq.id}`}
                  trigger={<FAQQuestion faq={faq} />}
                  contentClassName="w-full"
                  btnClassName="p-6"
                >
                  <FAQAnswer faq={faq} />
                </AccordionItem>
              </div>
              {role === 'ROLE_ADMIN' && !editMode && (
                <IconButton
                  iconName="trash"
                  color="red"
                  className="shrink-0"
                  onClick={() => handleOpenDeleteModal(faq)}
                />
              )}
            </Flex>
          ))}
        </Accordion>
      </FAQContainer>
      <DeleteModal
        title={deleteFAQData?.question || ''}
        isOpen={isOpen}
        closeModal={closeModal}
        onDeleteFaq={handleDelete}
      />
    </>
  );
}

function FAQQuestion({ faq }: { faq: FAQ }) {
  return (
    <Flex gap={6} className="w-full">
      <Flex className="shrink-0">
        <Body1>Q</Body1>
        <Body1 className="text-primary-300">.</Body1>
      </Flex>
      <Body1 className="flex-1 truncate">{faq.question}</Body1>
    </Flex>
  );
}

function FAQAnswer({ faq }: { faq: FAQ }) {
  return (
    <Flex gap={6} className="w-full">
      <Flex className="shrink-0">
        <Body1>A</Body1>
        <Body1 className="text-primary-300">.</Body1>
      </Flex>
      <Body2 weight="medium" className="min-w-0 flex-1 break-words">
        {faq.reply}
      </Body2>
    </Flex>
  );
}

function FAQContainer({ children }: PropsWithChildren) {
  return (
    <Flex
      dir="col"
      justifyContent="between"
      alignItems="center"
      className="w-full"
    >
      {children}
    </Flex>
  );
}
