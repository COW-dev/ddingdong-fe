'use client';

import { useState, type FormEvent } from 'react';

import {
  Body2,
  Button,
  DoubleButton,
  Flex,
  Input,
  Modal,
  Title2,
} from '@dds/shared';
import { toast } from 'react-hot-toast';

import { useCreateCalendarCategory } from '@/_api/mutations/calendar';
import {
  calendarCategoryRequestSchema,
  type CalendarCategoryRequest,
} from '@/_api/types/calendar';

import { CalendarCategoryColorPicker } from './CalendarCategoryColorPicker';

const DEFAULT_CATEGORY_COLOR = '#6366f1';

type CalendarCategoryCreateModalProps = {
  readonly isOpen: boolean;
  readonly closeModal: () => void;
  readonly onCreated: (category: CalendarCategoryRequest) => void;
};

export function CalendarCategoryCreateModal({
  isOpen,
  closeModal,
  onCreated,
}: CalendarCategoryCreateModalProps) {
  const createCategory = useCreateCalendarCategory();
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useState(DEFAULT_CATEGORY_COLOR);

  function resetForm() {
    setCategoryName('');
    setColor(DEFAULT_CATEGORY_COLOR);
  }

  function close() {
    resetForm();
    closeModal();
  }

  function submitCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const request = calendarCategoryRequestSchema.safeParse({
      categoryName,
      color,
    });

    if (!request.success) {
      toast.error(
        request.error.issues.at(0)?.message ??
          '카테고리 정보를 다시 확인해 주세요.',
      );
      return;
    }

    createCategory.mutate(request.data, {
      onSuccess: () => {
        toast.success('카테고리가 등록되었어요.');
        resetForm();
        onCreated(request.data);
      },
      onError: () => toast.error('카테고리를 등록하지 못했어요.'),
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={close}
      closeOnOutsideClick={!createCategory.isPending}
      contentClassName="rounded-2xl p-6 md:p-10"
    >
      <form
        className="flex max-h-[85vh] w-[88vw] max-w-lg flex-col gap-6 overflow-y-auto"
        onSubmit={submitCategory}
      >
        <Title2 as="h2">카테고리 추가</Title2>
        <Flex dir="col" className="gap-3">
          <Body2 as="label" htmlFor="calendar-category-create-name">
            카테고리명
          </Body2>
          <Input
            id="calendar-category-create-name"
            value={categoryName}
            placeholder="새로운 카테고리"
            className="min-h-14"
            autoFocus
            onChange={(event) => setCategoryName(event.target.value)}
            onClickReset={() => setCategoryName('')}
          />
        </Flex>
        <Flex dir="col" className="gap-3">
          <Body2>카테고리 색상</Body2>
          <CalendarCategoryColorPicker color={color} onChange={setColor} />
        </Flex>
        <DoubleButton
          left={
            <Button
              type="button"
              variant="tertiary"
              size="full"
              disabled={createCategory.isPending}
              onClick={close}
            >
              <Body2>취소</Body2>
            </Button>
          }
          right={
            <Button
              type="submit"
              variant="primary"
              color="blue"
              size="full"
              isLoading={createCategory.isPending}
            >
              <Body2 weight="semibold">추가하기</Body2>
            </Button>
          }
        />
      </form>
    </Modal>
  );
}
