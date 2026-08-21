import { Select } from '@dds/shared';

import type { CalendarCategoryResponse } from '@/_api/types/calendar';

type CalendarCategorySelectProps = {
  readonly categories: readonly CalendarCategoryResponse[];
  readonly value: number | '';
  readonly onChange: (categoryId: number) => void;
  readonly onCreate: () => void;
};

const CREATE_CATEGORY_LABEL = '새 카테고리 추가';

export function CalendarCategorySelect({
  categories,
  value,
  onChange,
  onCreate,
}: CalendarCategorySelectProps) {
  const selectedCategory = categories.find(({ id }) => id === value);

  return (
    <div className="mr-2 flex w-48 shrink-0 items-center gap-2">
      <span
        aria-hidden="true"
        className="size-4 shrink-0 rounded-full"
        style={{ backgroundColor: selectedCategory?.color ?? '#3b82f6' }}
      />
      <Select
        size="md"
        value={String(value)}
        displayValue={selectedCategory?.name}
        defaultValue="카테고리"
        aria-label="이벤트 카테고리 선택"
        onChange={(option) => {
          if (option === CREATE_CATEGORY_LABEL) {
            onCreate();
            return;
          }

          onChange(Number(option));
        }}
      >
        {categories.map((category) => (
          <Select.Option
            key={category.id}
            name={category.name}
            value={String(category.id)}
          />
        ))}
        <Select.Option
          name={CREATE_CATEGORY_LABEL}
          className="text-primary-300 border-t border-gray-100"
        />
      </Select>
    </div>
  );
}
