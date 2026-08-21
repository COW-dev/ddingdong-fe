import { Body3, Flex } from '@dds/shared';

const COLOR_PRESETS = [
  { label: '빨강', value: '#ef4444' },
  { label: '주황', value: '#f97316' },
  { label: '노랑', value: '#fbbf24' },
  { label: '초록', value: '#4ade80' },
  { label: '파랑', value: '#3b82f6' },
  { label: '보라', value: '#6366f1' },
] as const;

type CalendarCategoryColorPresetsProps = {
  readonly color: string;
  readonly onChange: (color: string) => void;
};

export function CalendarCategoryColorPresets({
  color,
  onChange,
}: CalendarCategoryColorPresetsProps) {
  return (
    <fieldset>
      <legend className="mb-2">
        <Body3 as="span" className="text-gray-500">
          프리셋 색상
        </Body3>
      </legend>
      <Flex justifyContent="between" className="gap-2">
        {COLOR_PRESETS.map((preset) => {
          const isSelected = color.toLowerCase() === preset.value;

          return (
            <button
              key={preset.value}
              type="button"
              aria-label={`${preset.label} 색상 선택`}
              aria-pressed={isSelected}
              onClick={() => onChange(preset.value)}
              className="focus-visible:ring-primary-400 flex size-9 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className={`size-6 rounded-full ${isSelected ? 'ring-2 ring-gray-400 ring-offset-2' : ''}`}
                style={{ backgroundColor: preset.value }}
              />
            </button>
          );
        })}
      </Flex>
    </fieldset>
  );
}
