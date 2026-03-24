import { cn } from '@/shared/lib/core';

type Props = {
  /**
   * optional additional CSS class names like size etc.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: Props) {
  return (
    <div className={cn('w-full animate-pulse rounded-md bg-gray-200', className)} {...props} />
  );
}

type TextProps = {
  /**
   * optional additional CSS class names like size etc.
   */
  className?: string;
  /**
   * length of text line
   * @default 2
   */
  length?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function TextSkeleton({ length = 2, className = '', ...props }: TextProps) {
  return (
    <div {...props} className={cn('w-full space-y-2', className)}>
      {[...Array(length)].map((_, index) => (
        <Skeleton key={index} className={cn('h-2', index === length - 1 ? 'w-[70%]' : 'w-full')} />
      ))}
    </div>
  );
}
