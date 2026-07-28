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
} from '@dds/shared';
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
  type CalendarCategoryResponse,
  type CalendarRepeatType,
} from '@/_api/types/calendar';

import { getCurrentCalendarDate } from '../_utils/calendarViewModel';

import { CalendarEventFormFields } from './CalendarEventFormFields';

type CalendarEventModalProps = {
  readonly categories: readonly CalendarCategoryResponse[];
  readonly isOpen: boolean;
  readonly closeModal: () => void;
} & (
  | { readonly mode: 'create' }
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
  const isSaving = createEvent.isPending || updateEvent.isPending;
  const isPending = isSaving || deleteEvent.isPending;
  const event = eventQuery.data;
  const today = getCurrentCalendarDate();
  useEffect(() => {
    if (isOpen) setRepeatType(event?.repeatType ?? 'NONE');
  }, [event?.repeatType, isOpen]);

  function closeModal() {
    setIsDeleteConfirming(false);
    closeParentModal();
  }

  function submitEvent(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    const form = new FormData(submitEvent.currentTarget);
    const endDate = form.get('endDate');
    const request = calendarEventRequestSchema.safeParse({
      title: form.get('title'),
      startDate: form.get('startDate'),
      endDate,
      repeatEndDate:
        repeatType === 'NONE' ? endDate : form.get('repeatEndDate'),
      repeatType,
      categoryId: Number(form.get('categoryId')),
    });

    if (!request.success) {
      toast.error(
        request.error.issues.at(0)?.message ??
          '일정 정보를 다시 확인해 주세요.',
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
        className="max-h-[85vh] w-[88vw] max-w-xl gap-4 overflow-y-auto"
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
            key={`${mode}:${event?.id ?? 0}:${isOpen}`}
            className="flex flex-col gap-4"
            onSubmit={submitEvent}
          >
            <CalendarEventFormFields
              categories={categories}
              event={event}
              repeatType={repeatType}
              today={today}
              onRepeatTypeChange={setRepeatType}
            />
            {mode === 'edit' && isDeleteConfirming && (
              <Flex
                justifyContent="between"
                className="rounded-xl bg-red-50 p-4"
              >
                <Body3 className="text-red-300">이 일정을 삭제할까요?</Body3>
                <Flex className="gap-2">
                  <Button
                    type="button"
                    variant="tertiary"
                    size="sm"
                    onClick={() => setIsDeleteConfirming(false)}
                  >
                    취소
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    color="red"
                    size="sm"
                    isLoading={deleteEvent.isPending}
                    onClick={deleteEventItem}
                  >
                    삭제
                  </Button>
                </Flex>
              </Flex>
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
                  disabled={categories.length === 0}
                >
                  <Body2 weight="semibold">
                    {mode === 'create' ? '등록하기' : '수정하기'}
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
