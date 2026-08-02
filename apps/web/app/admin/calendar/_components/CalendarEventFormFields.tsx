import { useEffect, useState } from 'react';

import {
  Body2,
  parseCalendarDate,
  Select,
  type CalendarDate,
} from '@dds/shared';

import {
  type CalendarCategoryRequest,
  type CalendarCategoryResponse,
  type CalendarEventResponse,
  type CalendarRepeatType,
} from '@/_api/types/calendar';
import {
  AdminCalendarField,
  fromIsoDate,
  toIsoDate,
  type CalendarDateRange,
} from '@/admin/_components/AdminCalendarField';

import { CalendarCategorySelect } from './CalendarCategorySelect';

const REPEAT_OPTIONS = [
  { value: 'NONE', label: '반복 안 함' },
  { value: 'DAILY', label: '매일' },
  { value: 'WEEKLY', label: '매주' },
  { value: 'MONTHLY', label: '매월' },
  { value: 'YEARLY', label: '매년' },
] as const satisfies readonly {
  readonly value: CalendarRepeatType;
  readonly label: string;
}[];

const MIN_EVENT_DATE = new Date(1900, 0, 1);
const MAX_EVENT_DATE = new Date(9999, 11, 31);
type CalendarEventFormFieldsProps = {
  readonly categories: readonly CalendarCategoryResponse[];
  readonly event?: CalendarEventResponse;
  readonly initialDate: CalendarDate;
  readonly repeatType: CalendarRepeatType;
  readonly createdCategory?: CalendarCategoryRequest;
  readonly onCreateCategory: () => void;
  readonly onRepeatTypeChange: (repeatType: CalendarRepeatType) => void;
  readonly onCalendarOpenChange?: (isOpen: boolean) => void;
};

export function CalendarEventFormFields({
  categories,
  event,
  initialDate,
  repeatType,
  createdCategory,
  onCreateCategory,
  onRepeatTypeChange,
  onCalendarOpenChange,
}: CalendarEventFormFieldsProps) {
  const initialCategory =
    categories.find(({ name }) => name === event?.category) ?? categories.at(0);
  const [categoryId, setCategoryId] = useState<number | ''>(
    initialCategory?.id ?? '',
  );
  const [dateRange, setDateRange] = useState<CalendarDateRange>(() => ({
    startDate: fromIsoDate(
      parseCalendarDate(event?.startDate ?? initialDate).value,
    ),
    endDate: fromIsoDate(
      parseCalendarDate(event?.endDate ?? initialDate).value,
    ),
  }));
  const [repeatEndDate, setRepeatEndDate] = useState(() =>
    fromIsoDate(
      parseCalendarDate(event?.repeatEndDate ?? event?.endDate ?? initialDate)
        .value,
    ),
  );
  const matchingCreatedCategories = createdCategory
    ? categories.filter(
        ({ name, color }) =>
          name === createdCategory.categoryName &&
          color === createdCategory.color,
      )
    : [];
  const selectedCreatedCategory =
    matchingCreatedCategories.length === 1
      ? matchingCreatedCategories.at(0)
      : undefined;
  const selectedCreatedCategoryId = selectedCreatedCategory?.id;
  const selectedRepeatOption = REPEAT_OPTIONS.find(
    ({ value }) => value === repeatType,
  );

  useEffect(() => {
    if (categoryId !== '' || !initialCategory) return;

    setCategoryId(initialCategory.id);
  }, [categoryId, initialCategory]);

  useEffect(() => {
    if (!selectedCreatedCategoryId) return;

    setCategoryId(selectedCreatedCategoryId);
  }, [selectedCreatedCategoryId]);

  return (
    <>
      <div className="flex flex-1 flex-col gap-2">
        <Body2 as="label" htmlFor="calendar-event-title">
          이벤트명
        </Body2>
        <div className="flex min-h-14 items-center rounded-xl border border-gray-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
          <input
            id="calendar-event-title"
            name="title"
            defaultValue={event?.title ?? ''}
            placeholder="새로운 이벤트"
            className="min-w-0 flex-1 bg-transparent px-4 text-gray-600 outline-none"
          />
          <CalendarCategorySelect
            categories={categories}
            value={categoryId}
            onChange={setCategoryId}
            onCreate={onCreateCategory}
          />
          <input type="hidden" name="categoryId" value={categoryId} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Body2>기간 선택</Body2>
        <AdminCalendarField
          mode="range"
          value={dateRange}
          onChange={(value) => {
            setDateRange(value);
            if (value.endDate && repeatEndDate < value.endDate) {
              setRepeatEndDate(value.endDate);
            }
          }}
          minDate={MIN_EVENT_DATE}
          maxDate={MAX_EVENT_DATE}
          placeholder="시작일과 종료일을 선택해 주세요."
          ariaLabel="이벤트 기간 선택"
          onOpenChange={onCalendarOpenChange}
        />
        <input
          type="hidden"
          name="startDate"
          value={dateRange.startDate ? toIsoDate(dateRange.startDate) : ''}
        />
        <input
          type="hidden"
          name="endDate"
          value={dateRange.endDate ? toIsoDate(dateRange.endDate) : ''}
        />
      </div>
      <Field label="반복">
        <Select
          value={selectedRepeatOption?.label ?? ''}
          defaultValue="반복 안 함"
          aria-label="이벤트 반복 주기"
          onChange={(optionLabel) => {
            const option = REPEAT_OPTIONS.find(
              ({ label }) => label === optionLabel,
            );
            if (option) onRepeatTypeChange(option.value);
          }}
        >
          {REPEAT_OPTIONS.map((option) => (
            <Select.Option key={option.value} name={option.label} />
          ))}
        </Select>
      </Field>
      {repeatType !== 'NONE' && (
        <div className="flex flex-1 flex-col gap-2">
          <Body2>반복 종료</Body2>
          <AdminCalendarField
            value={repeatEndDate}
            onChange={setRepeatEndDate}
            minDate={dateRange.endDate ?? dateRange.startDate ?? MIN_EVENT_DATE}
            maxDate={MAX_EVENT_DATE}
            placeholder="반복 종료일을 선택해 주세요."
            ariaLabel="반복 종료일 선택"
            onOpenChange={onCalendarOpenChange}
          />
          <input
            type="hidden"
            name="repeatEndDate"
            value={toIsoDate(repeatEndDate)}
          />
        </div>
      )}
    </>
  );
}

function Field({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <label className="flex flex-1 flex-col gap-2">
      <Body2>{label}</Body2>
      {children}
    </label>
  );
}
