'use client';

import React from 'react';

import { Input } from 'ddingdong-design-system';

export type FieldConfig = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
};

type Props = {
  field: FieldConfig;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
  className?: string;
};

export function LabeledInput({
  field,
  value,
  onChange,
  onReset,
  className,
}: Props) {
  const { id, name, label, placeholder, type = 'text' } = field;

  const handleReset = () => {
    if (onReset) return onReset();

    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-400"
      >
        {label}
      </label>
      <Input
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onClickReset={handleReset}
      />
    </div>
  );
}
