'use client';

import { useState } from 'react';

import {
  Body1,
  Body2,
  Button,
  Caption1,
  DoubleButton,
  Flex,
  Modal,
  Radio,
  RadioItem,
  Title3,
} from '@dds/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/_api/fetcher';
import { useDeleteTerm } from '@/_api/mutations/report';
import { reportQueryOptions } from '@/_api/queries/report';
import { parseDate } from '@/_utils/parse';

type Props = {
  isOpen: boolean;
  closeModal: VoidFunction;
};

export function DeleteTermModal({ isOpen, closeModal }: Props) {
  const { data: terms } = useSuspenseQuery(reportQueryOptions.terms());
  const { mutate, isPending } = useDeleteTerm();
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);

  function handleClose() {
    setSelectedTerm(null);
    closeModal();
  }

  function handleDelete() {
    if (selectedTerm === null) return;

    mutate(selectedTerm, {
      onSuccess: () => {
        toast.success('회차가 삭제되었어요.');
        handleClose();
      },
      onError: (error: Error) => {
        if (!(error instanceof ApiError)) {
          return toast.error('회차 삭제에 실패했어요.');
        }
        if (error.status === 400) {
          return toast.error('제출된 활동보고서가 있어 삭제할 수 없어요');
        }
        if (error.status === 404) {
          setSelectedTerm(null);
          return toast.error('이미 삭제되었거나 존재하지 않는 회차예요.');
        }
        toast.error(error.message);
      },
    });
  }

  return (
    <Modal isOpen={isOpen} closeModal={handleClose}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[480px]">
        <Title3>회차 삭제</Title3>
        <div className="h-[1.5px] bg-gray-200" />
        <Caption1 className="text-gray-400">
          제출된 활동보고서가 있는 회차는 삭제할 수 없어요.
        </Caption1>
        {terms.length === 0 ? (
          <Body1 className="py-2 text-gray-400">삭제할 회차가 없어요.</Body1>
        ) : (
          <Radio
            name="deleteTerm"
            value={selectedTerm ?? undefined}
            onValueChange={(value) => setSelectedTerm(Number(value))}
            className="flex max-h-[40vh] flex-col gap-3 overflow-y-auto"
          >
            {terms.map(({ term, startDate, endDate }) => (
              <Flex key={term} gap={3} alignItems="center">
                <RadioItem id={`delete-term-${term}`} value={term} />
                <Body2 as="label" htmlFor={`delete-term-${term}`}>
                  {term}회차 · {parseDate(startDate)} - {parseDate(endDate)}
                </Body2>
              </Flex>
            ))}
          </Radio>
        )}
        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={handleClose}>
              <Body2 weight="bold">닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="red"
              size="full"
              disabled={selectedTerm === null || isPending}
              onClick={handleDelete}
            >
              <Body2 weight="bold">삭제하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
