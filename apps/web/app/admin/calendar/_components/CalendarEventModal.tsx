'use client';

import { useEffect, useState, type FormEvent } from 'react';

import { Body3, Flex, Modal, Title2, type CalendarDate } from '@dds/shared';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import {
  useCreateCalendarEvent,
  useDeleteCalendarEvent,
  useUpdateCalendarEvent,
} from '@/_api/mutations/calendar';
import { calendarQueryOptions } from '@/_api/queries/calendar';
import {
  calendarEventRequestSchema,
  type CalendarCategoryRequest,
  type CalendarCategoryResponse,
  type CalendarRepeatType,
} from '@/_api/types/calendar';

import { getCurrentCalendarDate } from '../_utils/calendarViewModel';

import { CalendarCategoryCreateModal } from './CalendarCategoryCreateModal';
import { CalendarEventDeleteConfirm } from './CalendarEventDeleteConfirm';
import { CalendarEventFormFields } from './CalendarEventFormFields';
import { CalendarEventModalActions } from './CalendarEventModalActions';

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
  const updateEvent = useUpdateCalendarEvent();
  const deleteEvent = useDeleteCalendarEvent();
  const [repeatType, setRepeatType] = useState<CalendarRepeatType>('NONE');
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const [isFormOverlayOpen, setIsFormOverlayOpen] = useState(false);
  const [isCategoryCreateOpen, setIsCategoryCreateOpen] = useState(false);
  const [createdCategory, setCreatedCategory] =
    useState<CalendarCategoryRequest>();
  const isSaving = createEvent.isPending || updateEvent.isPending;
  const isPending = isSaving || deleteEvent.isPending;
  const event = eventQuery.data;
  const today = getCurrentCalendarDate();
  const initialDate = mode === 'create' ? editor.initialDate : today;
  useEffect(() => {
    if (isOpen) setRepeatType(event?.repeatType ?? 'NONE');
  }, [event?.repeatType, isOpen]);

  function closeModal() {
    setIsDeleteConfirming(false);
    setIsFormOverlayOpen(false);
    setIsCategoryCreateOpen(false);
    setCreatedCategory(undefined);
    closeParentModal();
  }

  function submitEvent(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    if (isCategoryCreateOpen) return;
    const form = new FormData(submitEvent.currentTarget);
    const endDate = form.get('endDate');
    const categoryId = Number(form.get('categoryId'));
    const selectedCategory = categories.find(({ id }) => id === categoryId);
    if (!selectedCategory) {
      toast.error('카테고리를 선택해 주세요.');
      return;
    }

    const request = calendarEventRequestSchema.safeParse({
      title: form.get('title'),
      startDate: form.get('startDate'),
      endDate,
      repeatEndDate:
        repeatType === 'NONE' ? endDate : form.get('repeatEndDate'),
      repeatType,
      categoryId,
    });

    if (!request.success) {
      toast.error(
        request.error.issues.at(0)?.message ??
          '이벤트 정보를 다시 확인해 주세요.',
      );
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

    const options = {
      onSuccess: () => {
        toast.success(
          mode === 'create'
            ? '이벤트가 생성되었어요.'
            : '이벤트가 수정되었어요.',
        );
        closeModal();
      },
      onError: () => toast.error('이벤트를 저장하지 못했어요.'),
    };

    if (mode === 'create') {
      createEvent.mutate(request.data, options);
    } else {
      updateEvent.mutate({ eventId, request: request.data }, options);
    }
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
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        closeOnOutsideClick={
          !isPending && !isCategoryCreateOpen && !isDeleteConfirming
        }
        contentClassName="rounded-2xl p-6 md:p-10"
      >
        <Flex
          dir="col"
          aria-hidden={isCategoryCreateOpen || isDeleteConfirming}
          inert={isCategoryCreateOpen || isDeleteConfirming}
          className={`max-h-dvh w-[88vw] max-w-lg gap-6 overflow-y-auto ${
            isFormOverlayOpen ? 'h-160' : ''
          }`}
        >
          <Title2 as="h2">
            {mode === 'create' ? '이벤트 생성' : '이벤트 수정'}
          </Title2>

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
              className="flex flex-col gap-6"
              onSubmit={submitEvent}
            >
              <CalendarEventFormFields
                categories={categories}
                event={event}
                initialDate={initialDate}
                repeatType={repeatType}
                createdCategory={createdCategory}
                onCreateCategory={() => setIsCategoryCreateOpen(true)}
                onRepeatTypeChange={setRepeatType}
                onOverlayOpenChange={setIsFormOverlayOpen}
              />
              {mode === 'edit' && isDeleteConfirming && (
                <CalendarEventDeleteConfirm
                  isPending={deleteEvent.isPending}
                  onCancel={() => setIsDeleteConfirming(false)}
                  onConfirm={deleteEventItem}
                />
              )}
              <CalendarEventModalActions
                mode={mode}
                isPending={isPending}
                isSaving={isSaving}
                canSave={categories.length > 0}
                onClose={closeModal}
                onDelete={() => setIsDeleteConfirming(true)}
              />
            </form>
          )}
        </Flex>
      </Modal>
      <CalendarCategoryCreateModal
        isOpen={isCategoryCreateOpen}
        closeModal={() => setIsCategoryCreateOpen(false)}
        onCreated={(category) => {
          setCreatedCategory(category);
          setIsCategoryCreateOpen(false);
        }}
      />
    </>
  );
}
