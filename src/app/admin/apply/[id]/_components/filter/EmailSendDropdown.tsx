'use client';

import { useRouter } from 'next/navigation';

import { Button, Caption1, Flex } from 'ddingdong-design-system';

import { useClickOutside } from '@/hooks/useClickOutside';
import { cn } from '@/lib/utils';

const EMAIL_SEND_OPTIONS = [
  { label: '지원 결과 전송', href: 'new' },
  { label: '이메일 전송 현황', href: 'deliveries' },
] as const;

type EmailSendDropdownProps = {
  formId: number;
};

export function EmailSendDropdown({ formId }: EmailSendDropdownProps) {
  const router = useRouter();
  const { isOpen, setIsOpen, ref: dropdownRef } = useClickOutside();

  const handleOptionClick = (path: string) => {
    setIsOpen(false);
    router.push(`/apply/${formId}/email/${path}`);
  };

  return (
    <div ref={dropdownRef} className="relative hidden md:block">
      <Button
        type="button"
        size="sm"
        variant="secondary"
        color="blue"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1"
      >
        지원 결과 전송
      </Button>

      <div
        className={cn(
          'absolute top-full left-0 z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-200',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <div className="m-2">
          {EMAIL_SEND_OPTIONS.map((option) => (
            <Flex
              key={option.href}
              as="button"
              justifyContent="center"
              onClick={() => handleOptionClick(option.href)}
              className="w-full gap-2 rounded-lg py-2 text-center hover:bg-gray-100 focus:bg-gray-100"
            >
              <Caption1>{option.label}</Caption1>
            </Flex>
          ))}
        </div>
      </div>
    </div>
  );
}
