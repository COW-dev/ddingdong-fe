'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Body3,
  Button,
  DoubleButton,
  Flex,
  Title1,
} from 'ddingdong-design-system';

import { faqQueryOptions } from '@/app/_api/queries/faq';
import { RoleType } from '@/constants/role';

import { FAQManageAccordion } from '../_components/FAQManageAccordion';
import { NewFAQAccordion } from '../_components/NewFAQAccordion';
import { useFAQ } from '../_hooks/useFAQ';

export function FaqClientPage({ role }: { role: keyof RoleType }) {
  const { data: FAQs } = useSuspenseQuery(faqQueryOptions.all());
  const {
    editMode,
    newFAQs,
    handleAddNewFAQ,
    handleEditFAQ,
    handleCancelFAQ,
    handleSaveFAQ,
    handleUpdateNewFAQ,
    handleDeleteNewFAQ,
  } = useFAQ();

  return (
    <>
      <Flex justifyContent="between" alignItems="center" className="w-full">
        <Title1 weight="bold" className="py-7 md:py-10">
          FAQ
        </Title1>
        {role === 'ROLE_ADMIN' && (
          <Flex gap={8}>
            {editMode ? (
              <DoubleButton
                left={
                  <Button
                    size="md"
                    variant="tertiary"
                    onClick={handleCancelFAQ}
                  >
                    <Body3 weight="bold">취소</Body3>
                  </Button>
                }
                right={
                  <Button
                    size="md"
                    variant="secondary"
                    color="blue"
                    onClick={handleSaveFAQ}
                    disabled={newFAQs.length === 0}
                  >
                    <Body3 weight="bold">저장하기</Body3>
                  </Button>
                }
              />
            ) : (
              <Button
                size="md"
                variant="primary"
                color="blue"
                onClick={handleEditFAQ}
              >
                <Body3 weight="bold">수정하기</Body3>
              </Button>
            )}
          </Flex>
        )}
      </Flex>
      {editMode && (
        <Body3
          role="button"
          className="mb-2 ml-auto w-fit cursor-pointer text-gray-400 underline"
          onClick={handleAddNewFAQ}
        >
          추가하기
        </Body3>
      )}
      {editMode && newFAQs.length > 0 && (
        <NewFAQAccordion
          newFAQs={newFAQs}
          onUpdate={handleUpdateNewFAQ}
          onDelete={handleDeleteNewFAQ}
        />
      )}
      <FAQManageAccordion role={role} editMode={editMode} FAQs={FAQs} />
    </>
  );
}
