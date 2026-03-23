import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/core';

import { useSelectContext } from './Select.context';

const optionVariants = cva(
  'font-semibold text- cursor-pointer first:rounded-t-md last:rounded-b-md hover:bg-gray-100',
  {
    variants: {
      size: {
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-3.5',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
);

type Props = {
  /**
   * The display name for the option.
   */
  name: string;
  /**
   * Additional classes to apply to the option.
   */
  className?: string;
} & VariantProps<typeof optionVariants>;

export function Option({ name, size, className }: Props) {
  const { onSelect, size: contextSize, selected } = useSelectContext();

  return (
    <div
      role="option"
      tabIndex={0}
      aria-selected={selected === name}
      onClick={() => onSelect(name)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(name);
        }
      }}
      className={cn(optionVariants({ size: size || contextSize }), className)}
    >
      {name}
    </div>
  );
}
