'use client';

import { Body3, Checkbox, Flex } from 'ddingdong-design-system';

import { cn } from '@/lib/utils';

import {
  APPLICANT_FILTER_OPTIONS,
  APPLICANT_FILTER_TYPE,
  ApplicantFilterType,
} from '../../_constants/applicantFilter';

type ApplicantFilterProps = {
  filterType: ApplicantFilterType;
  filterCounts: {
    [APPLICANT_FILTER_TYPE.ALL]: number;
    [APPLICANT_FILTER_TYPE.PASS]: number;
    [APPLICANT_FILTER_TYPE.FAIL]: number;
  };
  allChecked: boolean;
  onFilterChange: (filter: ApplicantFilterType) => void;
  onAllCheck: () => void;
};

export function ApplicantFilter({
  filterType,
  filterCounts,
  allChecked,
  onFilterChange,
  onAllCheck,
}: ApplicantFilterProps) {
  return (
    <Flex
      dir="row"
      alignItems="center"
      className="h-10 font-semibold whitespace-nowrap text-gray-500 md:whitespace-normal"
    >
      <Checkbox
        checked={allChecked}
        onCheckedChange={onAllCheck}
        className="mr-0.5 flex size-5 flex-shrink-0 cursor-pointer items-center md:size-6"
      />
      {APPLICANT_FILTER_OPTIONS.map((option, index) => {
        const isSelected = filterType === option.value;
        return (
          <Flex key={option.value} alignItems="center">
            {index > 0 && (
              <Body3 className="font-semibold text-gray-400 sm:text-sm">
                |
              </Body3>
            )}
            <Body3
              onClick={() => onFilterChange(option.value)}
              className={cn(
                'cursor-pointer px-0.5 text-sm font-semibold sm:px-2 md:px-4 md:text-base',
                isSelected ? 'text-blue-500' : 'text-gray-500',
              )}
            >
              {option.label}({filterCounts[option.value]})
            </Body3>
          </Flex>
        );
      })}
    </Flex>
  );
}
