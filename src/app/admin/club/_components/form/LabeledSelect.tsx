'use client';

import { Select } from 'ddingdong-design-system';

import { CATEGORY_OPTIONS } from '../../_constant/Inputs';

type Props = {
  id: string;
  label: string;
  value: string;
  options: typeof CATEGORY_OPTIONS;
  onChange: (val: string) => void;
  className?: string;
};

export function LabeledSelect({
  id,
  label,
  value,
  options,
  onChange,
  className,
}: Props) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-400"
      >
        {label}
      </label>
      <Select
        id={id}
        size="lg"
        value={value}
        defaultValue={options[0]}
        onChange={onChange}
      >
        {options.map((item, idx) => (
          <Select.Option key={`${id}-${idx}`} name={item} />
        ))}
      </Select>
    </div>
  );
}
