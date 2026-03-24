import { cva } from 'class-variance-authority';

import { cn } from '@/shared/lib/core';

import { Icon } from '../Icon';

type VariantColorMap = {
  primary: 'red' | 'blue';
  secondary: 'red' | 'blue' | 'green';
  tertiary: never;
};

export type ButtonVariant = keyof VariantColorMap;
type ButtonColor<V extends ButtonVariant> = VariantColorMap[V];

export type Props<V extends keyof VariantColorMap> = {
  /**
   * variant of the Button.
   */
  variant: V;
  /**
   * color of the Button.
   * @default 'blue'
   */
  color?: ButtonColor<V>;
  /**
   * size of the Button.
   * @default 'medium'
   */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /**
   * loading state of the Button
   * @default false
   */
  isLoading?: boolean;
  /**
   * border-radius option of the Button
   * @default false
   */
  rounded?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonVariants = cva(
  `flex justify-center items-center py-2 md:py-3 md:text-base md:font-semibold text-sm font-medium cursor-pointer`,
  {
    variants: {
      variant: {
        primary: 'text-white',
        secondary: '',
        tertiary: 'text-gray-400 bg-gray-100 hover:bg-gray-200',
      },
      size: {
        sm: 'px-3 md:px-4',
        md: 'px-5 md:px-7',
        lg: 'px-10 md:px-[60px]',
        full: 'w-full px-4',
      },
      color: {
        blue: '',
        red: '',
        green: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        color: 'red',
        class: 'text-white bg-red-200 hover:bg-red-300',
      },
      {
        variant: 'primary',
        color: 'blue',
        class: 'text-white bg-primary-300 hover:bg-primary-400',
      },
      {
        variant: 'secondary',
        color: 'blue',
        class: 'text-primary-300 bg-primary-100 hover:bg-primary-200',
      },
      {
        variant: 'secondary',
        color: 'red',
        class: 'text-red-200 bg-red-50 hover:bg-red-100',
      },
      {
        variant: 'secondary',
        color: 'green',
        class: 'text-green-200 bg-green-50 hover:bg-green-100',
      },
    ],
  }
);

export function Button<V extends ButtonVariant>({
  children,
  variant,
  color,
  size = 'md',
  rounded = false,
  isLoading = false,
  disabled,
  className,
  ...props
}: Props<V>) {
  const isDisabled = isLoading || disabled;

  return (
    <button
      type="button"
      className={cn(
        ButtonVariants({ variant, color, size }),
        isDisabled && `cursor-not-allowed bg-gray-100 text-gray-400 hover:bg-gray-100`,
        rounded ? 'rounded-full' : 'rounded-[10px] md:rounded-xl',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <Icon name="loading" size={25} className="mr-1.5 -ml-1 animate-spin max-md:h-[20px]" />
      )}
      {children}
    </button>
  );
}
