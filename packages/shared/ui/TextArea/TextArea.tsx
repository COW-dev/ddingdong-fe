import { ComponentProps } from 'react';

import { cn } from '@/shared/lib/core';

import { Flex } from '../Flex';
import { Caption1 } from '../Typography';

type TextAreaProps = {
  /**
   * Current value of the textarea
   */
  value: string;
  /**
   * Default height in number of rows
   * @default 3
   */
  rows?: number;
  /**
   * Whether to show character counter
   * @default false
   */
  showCounter?: boolean;
  /**
   * Custom class name for styling
   */
  className?: string;
  /**
   * Custom class name for Wrapper styling
   */
  wrapperClassName?: string;
} & Omit<ComponentProps<'textarea'>, 'rows'>;

export function TextArea({
  value,
  rows = 3,
  showCounter = false,
  className,
  wrapperClassName,
  ...props
}: TextAreaProps) {
  return (
    <Flex dir="col" gap={2} className={wrapperClassName}>
      <textarea
        rows={rows}
        className={cn(
          'w-full resize-none rounded-xl border-none bg-white px-4 py-3.5 text-gray-900 outline-1 outline-gray-200 transition-colors placeholder:text-gray-400 focus:ring-4 focus:ring-blue-200 focus:outline-blue-500',
          className
        )}
        value={value}
        {...props}
      />

      {showCounter && props.maxLength && (
        <Caption1 weight="normal" className="text-right text-gray-500">
          {value.length ?? 0}/{props.maxLength}
        </Caption1>
      )}
    </Flex>
  );
}
