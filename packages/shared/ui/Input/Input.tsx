import { ComponentProps } from 'react';

import { cn } from '@/shared/lib/core';

import { Flex } from '../Flex';
import { IconButton } from '../IconButton';

type InputProps = {
  /**
   * Callback function when the reset button is clicked.
   */
  onClickReset: () => void;
} & ComponentProps<'input'>;

export function Input({ value, onClickReset, className, ...props }: InputProps) {
  return (
    <Flex gap={8} alignItems="center" className="relative w-full">
      <input
        value={value}
        className={cn(
          'w-full rounded-xl border-none bg-white px-4 py-3.5 outline-1 outline-gray-200 focus:ring-4 focus:ring-blue-200 focus:outline-blue-500',
          className
        )}
        {...props}
      />
      {value && (
        <IconButton
          title="입력값 지우기"
          aria-label="입력값 지우기"
          iconName="close"
          color="gray"
          size={18}
          onClick={onClickReset}
          className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer"
        />
      )}
    </Flex>
  );
}
