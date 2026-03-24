import { useState } from 'react';

import { cn } from '@/shared/lib/core';
import { Icon } from '@/shared/ui/Icon/Icon';

type Props = {
  /**
   * additional className.
   */
  className?: string;
  /**
   * checked state of the checkbox.
   */
  checked?: boolean;
  /**
   * default checked state of the checkbox.
   */
  defaultChecked?: boolean;
  /**
   * disabled state of the checkbox.
   */
  disabled?: boolean;
  /**
   * callback function when checked state is changed.
   */
  onCheckedChange?: (checked: boolean) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked' | 'defaultChecked'>;

export function Checkbox({
  checked: controlledValue,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
  ...props
}: Props) {
  const [uncontrolledValue, setUncontrolledValue] = useState<boolean>(defaultChecked ?? false);
  const value = controlledValue ?? uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const nextValue = e.target.checked;
    if (controlledValue === undefined) {
      setUncontrolledValue(nextValue);
    }
    onCheckedChange?.(nextValue);
  };

  return (
    <label
      className={cn(
        'flex h-6 w-6 rounded-sm',
        value ? 'bg-primary-300' : 'border-[1.5px] border-gray-300',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <input
        type="checkbox"
        onChange={handleChange}
        checked={value}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      {value && <Icon name="check" color="primary" width={24} height={24} />}
    </label>
  );
}
