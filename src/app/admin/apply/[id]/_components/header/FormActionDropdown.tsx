'use client';

import { useRouter } from 'next/navigation';

import { Caption1, Flex, IconButton } from 'ddingdong-design-system';

import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';

type FormActionDropdownProps = {
  formId: number;
  onDelete: () => void;
  onRegister: () => void;
};

const ACTION_OPTIONS = [
  { label: '삭제', value: 'delete' },
  { label: '명단 연동', value: 'register' },
  { label: '이메일 전송', value: 'email' },
  { label: '통계', value: 'statistics' },
] as const;

export function FormActionDropdown({
  formId,
  onDelete,
  onRegister,
}: FormActionDropdownProps) {
  const router = useRouter();
  const { isOpen, setIsOpen, ref: dropdownRef } = useClickOutside();

  const handleAction = (value: string) => {
    setIsOpen(false);
    if (value === 'delete') {
      onDelete();
    } else if (value === 'register') {
      onRegister();
    } else if (value === 'email') {
      router.push(`/apply/${formId}/email`);
    } else if (value === 'statistics') {
      router.push(`/apply/${formId}/statistics`);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div className="block md:hidden">
        <IconButton
          iconName="etc"
          color="gray"
          size={20}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="메뉴 열기"
        />
      </div>

      <div
        className={cn(
          'absolute right-0 z-20 mt-2 min-w-[9rem] rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-200',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <div className="m-2">
          {ACTION_OPTIONS.map((option) => (
            <Flex
              key={option.value}
              as="button"
              justifyContent="center"
              onClick={() => handleAction(option.value)}
              className="w-full gap-2 rounded-lg p-2 text-center hover:bg-gray-100 focus:bg-gray-100"
            >
              <Caption1>{option.label}</Caption1>
            </Flex>
          ))}
        </div>
      </div>
    </div>
  );
}
