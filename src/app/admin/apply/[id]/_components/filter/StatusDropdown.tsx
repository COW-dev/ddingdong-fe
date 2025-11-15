'use client';

import { ReactNode } from 'react';

import { Caption1, Flex, Icon } from 'ddingdong-design-system';

import { useClickOutside } from '@/hooks/common/useClickOutside';
import { cn } from '@/lib/utils';

type StatusOption = {
  label: string;
  value: 'PASS' | 'FAIL';
};

type StatusDropdownProps = {
  selectedCount: number;
  onStatusChange: (status: 'PASS' | 'FAIL') => void;
  disabled?: boolean;
};

const STATUS_OPTIONS: StatusOption[] = [
  { label: '합격', value: 'PASS' },
  { label: '불합격', value: 'FAIL' },
];

export function StatusDropdown({
  selectedCount,
  onStatusChange,
  disabled = false,
}: StatusDropdownProps) {
  const { isOpen, setIsOpen, ref: dropdownRef } = useClickOutside();

  const handleStatusChange = (status: 'PASS' | 'FAIL') => {
    onStatusChange(status);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <Flex alignItems="center" className="h-10">
        <button
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className="flex h-9 w-[120px] items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-500 hover:bg-gray-100 md:w-[140px] md:gap-2 md:text-base"
        >
          합격여부변경
          <Icon
            name="arrowDown"
            size={18}
            color="gray"
            className={cn(
              'transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </Flex>

      <div
        className={cn(
          'absolute top-full left-0 z-20 mt-2 w-[120px] rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-200 md:w-[140px]',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0',
        )}
      >
        {STATUS_OPTIONS.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            disabled={selectedCount === 0}
          >
            {option.label}
          </DropdownItem>
        ))}
      </div>
    </div>
  );
}

function DropdownItem({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <Flex
      as="button"
      justifyContent="center"
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      className={cn(
        'w-full gap-2 rounded-lg p-2 text-center hover:bg-gray-100 focus:bg-gray-100',
        disabled && 'pointer-events-none cursor-not-allowed opacity-50',
      )}
    >
      <Caption1>{children}</Caption1>
    </Flex>
  );
}
