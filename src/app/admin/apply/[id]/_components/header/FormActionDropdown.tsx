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
  { label: '지원서 삭제', value: 'delete' },
  { label: '명단 연동', value: 'register' },
  { label: '지원 결과 전송', value: 'email' },
  { label: '이메일 전송 현황', value: 'deliveries' },
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
      return onDelete();
    }
    if (value === 'register') {
      return onRegister();
    }
    if (value === 'email') {
      return router.push(`/apply/${formId}/email/new`);
    }
    if (value === 'deliveries') {
      return router.push(`/apply/${formId}/email/deliveries`);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div className="block md:hidden">
        <Flex alignItems="center" gap={1}>
          <IconButton
            iconName="chart"
            color="primary"
            size={25}
            onClick={() => router.push(`/apply/${formId}/statistics`)}
            aria-label="지원서 통계 열기"
          />
          <IconButton
            iconName="etc"
            color="gray"
            size={20}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="메뉴 열기"
          />
        </Flex>
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
              className="w-full gap-2 rounded-lg py-1.5 text-center hover:bg-gray-100 focus:bg-gray-100"
            >
              <Caption1>{option.label}</Caption1>
            </Flex>
          ))}
        </div>
      </div>
    </div>
  );
}
