import * as React from 'react';

import { cn } from '@/shared/lib/core';

export type Props = React.HTMLAttributes<HTMLTableRowElement> & {
  className?: string;
  children?: React.ReactNode;
};

export function TableRow({ className, children, ...props }: Props) {
  return (
    <tr className={cn('border-b border-gray-200 last:border-0', className)} {...props}>
      {children}
    </tr>
  );
}
