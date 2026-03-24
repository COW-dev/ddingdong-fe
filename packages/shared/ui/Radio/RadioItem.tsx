import { useContext } from 'react';

import { Icon } from '../Icon';

import { RadioGroupContext } from './Radio.context';

import { cn } from '@/shared/lib/core';

type Props = {
  /**
   * size of the radio button.
   */
  size?: 'md' | 'lg';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'name'>;

export function RadioItem({
  value,
  id,
  className,
  disabled,
  onChange,
  size: sizeProp,
  ...props
}: Props) {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error('RadioItem must be used inside a RadioGroup');

  const isChecked = context.value === value;
  const isDisabled = context.disabled || disabled;
  const size = sizeProp ?? context.size;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onChange?.(e);
    context.onChange(value);
  };

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer',
        size === 'lg' ? 'h-8 w-8' : 'h-6 w-6',
        isDisabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        id={id}
        type="radio"
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
        className="sr-only"
        name={context.name}
        {...props}
      />
      {isChecked ? (
        <Icon
          name="check"
          color="primary"
          width={size === 'lg' ? 32 : 24}
          height={size === 'lg' ? 32 : 24}
          className="bg-primary-300 rounded-full"
        />
      ) : (
        <span
          className={cn(
            `w-full rounded-full border-gray-300`,
            size === 'lg' ? 'border-2' : 'border-[1.5px]'
          )}
        />
      )}
    </label>
  );
}
