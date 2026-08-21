import { Flex } from '@dds/shared';

import { CalendarCategoryColorPresets } from './CalendarCategoryColorPresets';

type CalendarCategoryColorPickerProps = {
  readonly color: string;
  readonly onChange: (color: string) => void;
};

export function CalendarCategoryColorPicker({
  color,
  onChange,
}: CalendarCategoryColorPickerProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <label className="relative block h-52 cursor-pointer overflow-hidden rounded-sm">
        <span className="sr-only">사용자 지정 색상 선택</span>
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundColor: color }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-white to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
        />
        <input
          type="color"
          value={color}
          onChange={(event) => onChange(event.target.value)}
          className="absolute inset-0 size-full cursor-crosshair opacity-0"
        />
      </label>

      <div
        aria-hidden="true"
        className="mt-4 h-3 rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
        }}
      />
      <div
        aria-hidden="true"
        className="mt-3 h-3 rounded-full border border-gray-100"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent, ${color}), repeating-conic-gradient(#e5e7eb 0 25%, white 0 50%)`,
          backgroundSize: 'auto, 8px 8px',
        }}
      />

      <Flex className="mt-3 gap-2">
        <output className="flex min-h-8 flex-1 items-center rounded border border-gray-200 px-2 text-sm text-gray-500">
          Hex: {color.toUpperCase()}
        </output>
        <output className="flex min-h-8 w-16 items-center justify-center rounded border border-gray-200 text-sm text-gray-500">
          100%
        </output>
      </Flex>

      <div className="mt-3">
        <CalendarCategoryColorPresets color={color} onChange={onChange} />
      </div>
    </div>
  );
}
