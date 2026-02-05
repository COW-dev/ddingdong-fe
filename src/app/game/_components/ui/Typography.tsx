import {
  ComponentPropsWithoutRef,
  createElement,
  ReactNode,
  CSSProperties,
} from 'react';

import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';
type TypographyVariant =
  | 'Title1'
  | 'Title2'
  | 'Title3'
  | 'Body1'
  | 'Body2'
  | 'Body3'
  | 'Caption1'
  | 'Caption2'
  | 'Caption3';
type FontWeight =
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 400
  | 500
  | 600
  | 700;

const variantClasses = cva('whitespace-pre-wrap font-school-safety', {
  variants: {
    type: {
      Title1: 'md:text-4xl text-2xl',
      Title2: 'md:text-3xl text-xl',
      Title3: 'md:text-2xl text-xl',
      Body1: 'md:text-xl text-lg',
      Body2: 'md:text-lg text-base',
      Body3: 'md:text-base text-base',
      Caption1: 'md:text-sm text-sm',
      Caption2: 'md:text-xs text-xs',
      Caption3: 'md:text-[10px] text-[8px]',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
    },
  },
  defaultVariants: {
    type: 'Body1',
    weight: 'semibold',
  },
});

type AllowedTag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'label' | 'span';

type Props<T extends AllowedTag> = {
  as?: T;
  variant?: TypographyVariant;
  weight?: FontWeight;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function Typography<T extends AllowedTag = 'p'>({
  as,
  weight,
  className,
  children,
  ...props
}: Props<T>) {
  const Component = as || 'p';

  const resolvedWeight =
    weight === undefined
      ? 600
      : typeof weight === 'number'
        ? weight
        : { normal: 400, medium: 500, semibold: 600, bold: 700 }[weight];

  return createElement(
    Component,
    {
      className: cn(
        variantClasses({
          type: props.variant,
          weight: typeof weight === 'number' ? weight : (weight ?? 'semibold'),
        }),
        className,
      ),
      style: {
        fontFamily: "'SchoolSafetyRoundedSmile', sans-serif",
        fontWeight: resolvedWeight,
        ...((props.style as CSSProperties) || {}),
      },
      ...props,
    },
    children,
  );
}

const createTypography = (variant: TypographyVariant) => {
  function Component<T extends AllowedTag = 'p'>(
    props: Omit<TypographyProps<T>, 'variant'>,
  ) {
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
export const Caption2 = createTypography('Caption2');
export const Caption3 = createTypography('Caption3');

export type TypographyProps<T extends AllowedTag> = Props<T>;
