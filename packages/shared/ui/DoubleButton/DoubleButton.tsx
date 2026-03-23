import { ReactNode } from 'react';

import { cn } from '@/shared/lib/core';

import { Flex } from '../Flex';

export type Props = {
  /**
   * left child of the DoubleButton
   */
  left: ReactNode;
  /**
   * right child of the DoubleButton
   */
  right: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function DoubleButton({ left, right, className, ...props }: Props) {
  return (
    <Flex
      {...props}
      dir="row"
      justifyContent="between"
      alignItems="center"
      className={cn('w-full gap-2 md:gap-4', className)}
    >
      {left}
      {right}
    </Flex>
  );
}
