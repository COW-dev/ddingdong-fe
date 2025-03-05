import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export default function ApplyContentBox({
  className,
  children,
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-start justify-start rounded-[10px] bg-blue-50 px-5 py-8 md:px-16',
        className,
      )}
    >
      {children}
    </div>
  );
}
