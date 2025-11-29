'use client';

import { memo, useState, useEffect, useRef } from 'react';

import { Body3, Icon } from 'ddingdong-design-system';

import { QuestionType } from '@/app/_api/types/apply';
import { cn } from '@/lib/utils';

type QuestionTypeSelectProps = {
  value: QuestionType;
  onChange: (type: QuestionType) => void;
  disabled?: boolean;
};

const QUESTION_TYPES: QuestionType[] = [
  'CHECK_BOX',
  'RADIO',
  'TEXT',
  'LONG_TEXT',
  'FILE',
];

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  CHECK_BOX: '체크박스',
  RADIO: '라디오',
  TEXT: '단답형',
  LONG_TEXT: '서술형',
  FILE: '파일',
};

function QuestionTypeSelectComponent({
  value,
  onChange,
  disabled = false,
}: QuestionTypeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (type: QuestionType) => {
    onChange(type);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={disabled}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Body3 className="text-gray-700">{QUESTION_TYPE_LABELS[value]}</Body3>
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

      <div
        className={cn(
          'absolute left-0 z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white transition-all duration-200',
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <div className="py-1">
          {QUESTION_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSelect(type)}
              className={cn(
                'w-full px-4 py-2 text-left transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
                value === type && 'bg-blue-50 text-blue-500',
              )}
            >
              <Body3
                className={cn(
                  value === type ? 'text-blue-500' : 'text-gray-700',
                )}
              >
                {QUESTION_TYPE_LABELS[type]}
              </Body3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const QuestionTypeSelect = memo(QuestionTypeSelectComponent);
