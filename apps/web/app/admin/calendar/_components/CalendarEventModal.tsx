'use client';

import { useEffect, useState, type FormEvent } from 'react';

import {
  Body2,
  Body3,
  Button,
  DoubleButton,
  Flex,
  Modal,
  Title3,
  type CalendarDate,
} from '@dds/shared';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import {
  useCreateCalendarCategory,
  useCreateCalendarEvent,
  useDeleteCalendarEvent,
  useUpdateCalendarCategory,
  useUpdateCalendarEvent,
} from '@/_api/mutations/calendar';
import { calendarQueryOptions } from '@/_api/queries/calendar';
import {
  calendarCategoryRequestSchema,
  calendarEventRequestSchema,
  type CalendarCategoryResponse,
  type CalendarRepeatType,
} from '@/_api/types/calendar';

import { getCurrentCalendarDate } from '../_utils/calendarViewModel';

import { CalendarEventDeleteConfirm } from './CalendarEventDeleteConfirm';
import { CalendarEventFormFields } from './CalendarEventFormFields';

type CalendarEventModalProps = {
  readonly categories: readonly CalendarCategoryResponse[];
  readonly isOpen: boolean;
  readonly closeModal: () => void;
} & (
  | { readonly mode: 'create'; readonly initialDate: CalendarDate }
  | { readonly mode: 'edit'; readonly eventId: number }
);

export function CalendarEventModal({
  categories,
  isOpen,
  closeModal: closeParentModal,
  ...editor
}: CalendarEventModalProps) {
  const { mode } = editor;
  const eventId = mode === 'edit' ? editor.eventId : 0;
  const eventQuery = useQuery({
    ...calendarQueryOptions.event(eventId),
    enabled: mode === 'edit' && isOpen,
  });
  const createEvent = useCreateCalendarEvent();
  const createCategory = useCreateCalendarCategory();
  const updateEvent = useUpdateCalendarEvent();
  const deleteEvent = useDeleteCalendarEvent();
  const updateCategory = useUpdateCalendarCategory();
  const [repeatType, setRepeatType] = useState<CalendarRepeatType>('NONE');
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const isSaving =
    createEvent.isPending ||
    createCategory.isPending ||
    updateEvent.isPending ||
    updateCategory.isPending;
  const isPending = isSaving || deleteEvent.isPending;
  const event = eventQuery.data;
  const today = getCurrentCalendarDate();
  const initialDate = mode === 'create' ? editor.initialDate : today;
  useEffect(() => {
    if (isOpen) setRepeatType(event?.repeatType ?? 'NONE');
  }, [event?.repeatType, isOpen]);

  function closeModal() {
    setIsDeleteConfirming(false);
    setIsCalendarOpen(false);
    closeParentModal();
  }

  function submitEvent(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    const form = new FormData(submitEvent.currentTarget);
    if (categories.length === 0) {
      const categoryRequest = calendarCategoryRequestSchema.safeParse({
        categoryName: form.get('categoryName'),
        color: form.get('categoryColor'),
      });

      if (!categoryRequest.success) {
        toast.error(
          categoryRequest.error.issues.at(0)?.message ??
            '카테고리 정보를 다시 확인해 주세요.',
        );
        return;
      }

      createCategory.mutate(categoryRequest.data, {
        onSuccess: () =>
          toast.success('카테고리가 등록되었어요. 이제 일정을 등록해 주세요.'),
        onError: () => toast.error('카테고리를 등록하지 못했어요.'),
      });
      return;
    }

    const endDate = form.get('endDate');
    const categoryId = Number(form.get('categoryId'));
    const request = calendarEventRequestSchema.safeParse({
      title: form.get('title'),
      startDate: form.get('startDate'),
      endDate,
      repeatEndDate:
        repeatType === 'NONE' ? endDate : form.get('repeatEndDate'),
      repeatType,
      categoryId,
    });
    const selectedCategory = categories.find(
      (category) => category.id === categoryId,
    );
    const categoryRequest = calendarCategoryRequestSchema.safeParse({
      categoryName: selectedCategory?.name,
      color: form.get('categoryColor'),
    });

    if (!request.success) {
      toast.error(
        request.error.issues.at(0)?.message ??
          '일정 정보를 다시 확인해 주세요.',
      );
      return;
    }
    if (!categoryRequest.success) {
      toast.error(
        categoryRequest.error.issues.at(0)?.message ??
          '카테고리 색상을 다시 확인해 주세요.',
      );
      return;
    }
    if (!selectedCategory) {
      toast.error('카테고리를 선택해 주세요.');
      return;
    }
    if (request.data.endDate < request.data.startDate) {
      toast.error('종료일은 시작일보다 빠를 수 없습니다.');
      return;
    }
    if (request.data.repeatEndDate < request.data.endDate) {
      toast.error('반복 종료일은 일정 종료일보다 빠를 수 없습니다.');
      return;
    }

    const saveEvent = () => {
      const options = {
        onSuccess: () => {
          toast.success(
            mode === 'create' ? '일정이 등록되었어요.' : '일정이 수정되었어요.',
          );
          closeModal();
        },
        onError: () => toast.error('일정을 저장하지 못했어요.'),
      };

      if (mode === 'create') {
        createEvent.mutate(request.data, options);
      } else {
        updateEvent.mutate({ eventId, request: request.data }, options);
      }
    };

    if (selectedCategory.color === categoryRequest.data.color) {
      saveEvent();
      return;
    }

    updateCategory.mutate(
      { categoryId, request: categoryRequest.data },
      {
        onSuccess: saveEvent,
        onError: () => toast.error('카테고리 색상을 저장하지 못했어요.'),
      },
    );
  }

  function deleteEventItem() {
    if (mode !== 'edit') return;

    deleteEvent.mutate(eventId, {
      onSuccess: () => {
        toast.success('일정이 삭제되었어요.');
        closeModal();
      },
      onError: () => toast.error('일정을 삭제하지 못했어요.'),
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      closeOnOutsideClick={!isPending}
    >
      <Flex
        dir="col"
        className={`w-[88vw] max-w-xl gap-4 overflow-y-auto ${
          isCalendarOpen ? 'h-[85vh]' : 'max-h-[85vh]'
        }`}
      >
        <Title3 as="h2">{mode === 'create' ? '일정 등록' : '일정 수정'}</Title3>

        {mode === 'edit' && eventQuery.isPending ? (
          <Body3 role="status" className="py-10 text-center text-gray-400">
            일정 정보를 불러오는 중입니다.
          </Body3>
        ) : mode === 'edit' && eventQuery.isError ? (
          <Body3 role="alert" className="py-10 text-center text-red-300">
            일정 정보를 불러오지 못했어요.
          </Body3>
        ) : (
          <form
            key={`${mode}:${event?.id ?? 0}:${initialDate}:${isOpen}`}
            className="flex flex-col gap-4"
            onSubmit={submitEvent}
          >
            <CalendarEventFormFields
              categories={categories}
              event={event}
              initialDate={initialDate}
              repeatType={repeatType}
              onRepeatTypeChange={setRepeatType}
              onCalendarOpenChange={setIsCalendarOpen}
            />
            {mode === 'edit' && isDeleteConfirming && (
              <CalendarEventDeleteConfirm
                isPending={deleteEvent.isPending}
                onCancel={() => setIsDeleteConfirming(false)}
                onConfirm={deleteEventItem}
              />
            )}
            <DoubleButton
              left={
                <Button
                  type="button"
                  variant={mode === 'edit' ? 'secondary' : 'tertiary'}
                  color={mode === 'edit' ? 'red' : undefined}
                  size="full"
                  disabled={isPending}
                  onClick={
                    mode === 'edit'
                      ? () => setIsDeleteConfirming(true)
                      : closeModal
                  }
                >
                  <Body2>{mode === 'edit' ? '삭제하기' : '닫기'}</Body2>
                </Button>
              }
              right={
                <Button
                  type="submit"
                  variant="primary"
                  color="blue"
                  size="full"
                  isLoading={isSaving}
                >
                  <Body2 weight="semibold">
                    {categories.length === 0
                      ? '카테고리 등록'
                      : mode === 'create'
                        ? '등록하기'
                        : '수정하기'}
                  </Body2>
                </Button>
              }
            />
          </form>
        )}
      </Flex>
    </Modal>
  );
}
