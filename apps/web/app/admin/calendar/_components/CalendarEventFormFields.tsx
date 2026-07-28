import { Body2, Flex } from '@dds/shared';

import {
  calendarRepeatTypeSchema,
  type CalendarCategoryResponse,
  type CalendarEventResponse,
  type CalendarRepeatType,
} from '@/_api/types/calendar';

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

type CalendarEventFormFieldsProps = {
  readonly categories: readonly CalendarCategoryResponse[];
  readonly event?: CalendarEventResponse;
  readonly repeatType: CalendarRepeatType;
  readonly today: string;
  readonly onRepeatTypeChange: (repeatType: CalendarRepeatType) => void;
};

export function CalendarEventFormFields({
  categories,
  event,
  repeatType,
  today,
  onRepeatTypeChange,
}: CalendarEventFormFieldsProps) {
  const categoryId =
    categories.find(({ name }) => name === event?.category)?.id ??
    categories.at(0)?.id;

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
      <Flex className="gap-4 max-md:flex-col">
        <DateField
          name="startDate"
          label="시작일"
          value={event?.startDate ?? today}
        />
        <DateField
          name="endDate"
          label="종료일"
          value={event?.endDate ?? today}
        />
      </Flex>
      <Field label="카테고리">
        <select
          name="categoryId"
          defaultValue={categoryId}
          className="min-h-13 rounded-xl border border-gray-200 bg-white px-4 text-gray-600"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>
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
        <DateField
          name="repeatEndDate"
          label="반복 종료일"
          value={event?.repeatEndDate ?? today}
        />
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

function DateField({
  name,
  label,
  value,
}: {
  readonly name: string;
  readonly label: string;
  readonly value: string;
}) {
  return (
    <Field label={label}>
      <input
        name={name}
        type="date"
        defaultValue={value}
        className="min-h-13 rounded-xl border border-gray-200 bg-white px-4 text-gray-600"
      />
    </Field>
  );
}
