import * as React from 'react';

import { cn } from '@/shared/lib/core';

import { Body2 } from '../Typography';

export type Props = React.TdHTMLAttributes<HTMLTableCellElement> & {
  className?: string;
  children?: React.ReactNode;
};

export function TableCell({ className, children, ...props }: Props) {
  return (
    <td className={cn('px-4 py-2 align-middle md:px-4', className)} {...props}>
      <Body2 className="whitespace-pre-wrap text-gray-400" weight="normal">
        {children}
      </Body2>
    </td>
  );
}
