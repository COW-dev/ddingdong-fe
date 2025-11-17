'use client';

import { Flex, Body3 } from 'ddingdong-design-system';

import { cn } from '@/lib/utils';

import {
  FORM_FILTER_OPTIONS,
  FORM_STATUS_FILTER,
  FormStatusFilter,
} from '../_constants/formFilter';

type FormCounts = {
  [FORM_STATUS_FILTER.ALL]: number;
  [FORM_STATUS_FILTER.BEFORE]: number;
  [FORM_STATUS_FILTER.IN_PROGRESS]: number;
  [FORM_STATUS_FILTER.CLOSED]: number;
};

type FormFilterProps = {
  formCounts: FormCounts;
  formFilter: FormStatusFilter;
  onFilterChange: (filter: string) => void;
};

export function FormFilter({
  formCounts,
  formFilter,
  onFilterChange,
}: FormFilterProps) {
  return (
    <Flex dir="row" alignItems="center" gap={2} className="mb-4">
      {FORM_FILTER_OPTIONS.map((option, index) => {
        const isSelected = formFilter === option.key;

        const handleClick = () => {
          onFilterChange(option.key);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onFilterChange(option.key);
          }
        };

        return (
          <Flex key={option.key} alignItems="center" gap={2}>
            {index > 0 && (
              <Body3 className="font-semibold text-gray-400">|</Body3>
            )}
            <Body3
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              className={cn(
                'cursor-pointer py-2 font-semibold',
                isSelected ? 'text-blue-500' : 'text-gray-500',
              )}
            >
              {option.label} <Body3 as="span">({formCounts[option.key]})</Body3>
            </Body3>
          </Flex>
        );
      })}
    </Flex>
  );
}
