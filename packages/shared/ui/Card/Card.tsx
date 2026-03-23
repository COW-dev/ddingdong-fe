import { ComponentProps, PropsWithChildren, ElementType } from 'react';

import { cn } from '@/shared/lib/core';

export type Props<T extends ElementType> = {
  /**
   * The HTML element or React component to render as the root element.
   * @defaults 'div'.
   */
  as?: T;
  /**
   * Additional CSS classNames to be applied to the Card.
   */
  className?: string;
} & PropsWithChildren<ComponentProps<T>>;

export function Card<T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: Props<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn(
        'box-border rounded-xl border border-gray-200 bg-white px-[22px] py-6 transition-colors hover:bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
