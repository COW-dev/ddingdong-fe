import * as React from 'react';

import { cn } from '@/shared/lib/core';

export type Props = React.HTMLAttributes<HTMLTableSectionElement> & {
  className?: string;
  children?: React.ReactNode;
};

export function TableHeader({ className, children, ...props }: Props) {
  return (
    <thead className={cn('bg-gray-50', className)} {...props}>
      {children}
    </thead>
  );
}
