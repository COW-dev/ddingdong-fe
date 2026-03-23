import * as React from 'react';

import { cn } from '@/shared/lib/core';

import { Body2 } from '../Typography';

export type Props = React.ThHTMLAttributes<HTMLTableCellElement> & {
  className?: string;
  children?: React.ReactNode;
};

export function TableHead({ className, children, ...props }: Props) {
  return (
    <th
      className={cn('h-10 px-4 py-2 text-left align-middle whitespace-nowrap', className)}
      {...props}
    >
      <Body2 className="text-gray-700">{children}</Body2>
    </th>
  );
}
