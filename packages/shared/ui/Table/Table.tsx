import * as React from 'react';

import { cn } from '@/shared/lib/core';

export type Props = React.HTMLAttributes<HTMLTableElement> & {
  /**
   * Optional custom className for additional styling.
   */
  className?: string;

  /**
   * Table content, usually composed of `<TableHeader>`, `<TableBody>`, etc.
   */
  children?: React.ReactNode;
};
export function Table({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        'no-scrollbar relative w-full overflow-auto rounded-md border border-gray-100',
        className
      )}
    >
      <table className="w-full table-fixed border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}
