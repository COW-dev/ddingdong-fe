import { cn } from '@/shared/lib/core';

import { Flex } from '../Flex';
import { Icon } from '../Icon';

type Props = {
  /**
   * The currently selected option.
   */
  selected: string;
  /**
   * Callback function to be called when the button is clicked.
   * @returns void
   */
  onClick: () => void;
  /**
   * Whether the dropdown is open or closed.
   */
  isOpen: boolean;
  /**
   * The size of the button.
   */
  size?: 'md' | 'lg';
  /**
   * Custom class name for styling.
   */
  className?: string;
};

const sizeVariants = {
  md: 'px-3 py-1 text-sm min-w-24 rounded-lg',
  lg: 'px-4 py-3.5 min-w-64 min-h-[52px] rounded-xl',
} as const;

export function SelectButton({
  selected,
  onClick,
  isOpen,
  size = 'lg',
  className,
  ...props
}: Props) {
  return (
    <Flex
      alignItems="center"
      onClick={onClick}
      className={cn(
        sizeVariants[size],
        'w-full border border-gray-200 bg-white font-semibold whitespace-nowrap text-gray-400',
        className
      )}
      {...props}
    >
      <button
        type="button"
        className={cn(
          'flex w-full cursor-pointer items-center justify-between rounded-xl align-middle leading-none',
          isOpen && 'hover:rounded-b-none'
        )}
      >
        {selected}
        <Icon
          size={20}
          name="arrowDown"
          className={cn(
            'transform transition-transform duration-300',
            isOpen && 'rotate-180',
            size === 'md' && 'w-5'
          )}
        />
      </button>
    </Flex>
  );
}
