import { useEffect, useState } from 'react';

import {
  Body2,
  Caption1,
  Flex,
  parseCalendarDate,
  type CalendarDate,
} from '@dds/shared';

import {
  calendarRepeatTypeSchema,
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
  readonly onRepeatTypeChange: (repeatType: CalendarRepeatType) => void;
  readonly onCalendarOpenChange?: (isOpen: boolean) => void;
};

export function CalendarEventFormFields({
  categories,
  event,
  initialDate,
  repeatType,
  onRepeatTypeChange,
  onCalendarOpenChange,
}: CalendarEventFormFieldsProps) {
  const initialCategory =
    categories.find(({ name }) => name === event?.category) ?? categories.at(0);
  const [categoryId, setCategoryId] = useState<number | ''>(
    initialCategory?.id ?? '',
  );
  const [categoryColor, setCategoryColor] = useState(
    initialCategory?.color ?? '#3b82f6',
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

  useEffect(() => {
    if (categoryId !== '' || !initialCategory) return;

    setCategoryId(initialCategory.id);
    setCategoryColor(initialCategory.color);
  }, [categoryId, initialCategory]);

  return (
    <>
      <Field label="일정 제목">
        <input
          name="title"
          defaultValue={event?.title ?? ''}
          placeholder="일정 제목을 입력해 주세요."
          className="min-h-13 rounded-xl border border-gray-200 bg-white px-4 text-gray-600"
        />
      </Field>
      <div className="flex flex-1 flex-col gap-2">
        <Body2>일정 기간</Body2>
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
          ariaLabel="일정 기간 선택"
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
      <fieldset className="flex flex-col gap-2">
        <legend>
          <Body2 as="span">카테고리</Body2>
        </legend>
        <Flex alignItems="center" className="gap-3">
          <input
            aria-label="카테고리 색상"
            name="categoryColor"
            type="color"
            value={categoryColor}
            onChange={(changeEvent) =>
              setCategoryColor(changeEvent.target.value)
            }
            className="h-13 w-14 shrink-0 cursor-pointer rounded-xl border border-gray-200 bg-white p-1"
          />
          {categories.length === 0 ? (
            <input
              aria-label="카테고리 이름"
              name="categoryName"
              placeholder="카테고리 이름을 입력해 주세요."
              className="min-h-13 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-gray-600"
            />
          ) : (
            <select
              aria-label="카테고리"
              name="categoryId"
              value={categoryId}
              onChange={(changeEvent) => {
                const category = categories.find(
                  ({ id }) => id === Number(changeEvent.target.value),
                );
                if (!category) return;

                setCategoryId(category.id);
                setCategoryColor(category.color);
              }}
              className="min-h-13 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-gray-600"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </Flex>
        <Caption1 className="text-gray-400">
          {categories.length === 0
            ? '먼저 일정에 사용할 카테고리를 등록해 주세요.'
            : '색상을 변경하면 이 카테고리를 사용하는 모든 일정에 적용됩니다.'}
        </Caption1>
      </fieldset>
      <Field label="반복">
        <select
          value={repeatType}
          onChange={(changeEvent) =>
            onRepeatTypeChange(
              calendarRepeatTypeSchema.parse(changeEvent.target.value),
            )
          }
          className="min-h-13 rounded-xl border border-gray-200 bg-white px-4 text-gray-600"
        >
          {REPEAT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
      {repeatType !== 'NONE' && (
        <div className="flex flex-1 flex-col gap-2">
          <Body2>반복 종료일</Body2>
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
