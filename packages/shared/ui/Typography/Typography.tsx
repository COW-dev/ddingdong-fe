import { cva } from 'class-variance-authority';
import { ComponentPropsWithoutRef, createElement, ReactNode } from 'react';

import { cn } from '@/shared/lib/core';

type TypographyVariant = 'Title1' | 'Title2' | 'Title3' | 'Body1' | 'Body2' | 'Body3' | 'Caption1';
type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';

const variantClasses = cva('whitespace-pre-wrap', {
  variants: {
    type: {
      Title1: 'md:text-4xl text-2xl',
      Title2: 'md:text-3xl text-xl',
      Title3: 'md:text-2xl text-xl',
      Body1: 'md:text-xl text-lg',
      Body2: 'md:text-lg text-base',
      Body3: 'md:text-base text-base',
      Caption1: 'md:text-sm text-sm',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    type: 'Body1',
    weight: 'semibold',
  },
});

type AllowedTag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'label' | 'span';

type TypographyProps<T extends AllowedTag> = {
  /**
   * The HTML element to use for the typography component.
   */
  as?: T;
  /**
   * The variant of the typography component.
   * @default 'Body1'
   */
  variant?: TypographyVariant;
  /**
   * The font weight of the typography component.
   *  @default 'medium'
   */
  weight?: FontWeight;
  /**
   * Additional CSS classes to apply to the typography component.
   */
  className?: string;
  /**
   * The content of the typography component.
   */
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function Typography<T extends AllowedTag = 'p'>({
  as,
  weight,
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'p';

  return createElement(
    Component,
    {
      className: cn(variantClasses({ type: props.variant, weight }), className),
      ...props,
    },
    children
  );
}

const createTypography = (variant: TypographyVariant) => {
  function Component<T extends AllowedTag = 'p'>(props: Omit<TypographyProps<T>, 'variant'>) {
    return <Typography variant={variant} {...props} />;
  }
  return Component;
};

export const Title1 = createTypography('Title1');
export const Title2 = createTypography('Title2');
export const Title3 = createTypography('Title3');
export const Body1 = createTypography('Body1');
export const Body2 = createTypography('Body2');
export const Body3 = createTypography('Body3');
export const Caption1 = createTypography('Caption1');
