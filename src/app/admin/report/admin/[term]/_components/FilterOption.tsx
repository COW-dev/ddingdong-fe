'use client';

import { useState } from 'react';
import { Club } from '@/app/_api/types/club';
import { Caption1, Flex } from 'ddingdong-design-system';
import clsx from 'clsx';

type FilterOptionProps = {
  filterOption: {
    all?: Club[];
    submit?: Club[];
    unSubmit?: Club[];
  };
  setFilteredClub: (clubs: Club[]) => void;
};

const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'submit', label: '제출완료' },
  { key: 'unSubmit', label: '미제출' },
] as const;

export default function FilterOption({
  setFilteredClub,
  filterOption,
}: FilterOptionProps) {
  const [option, setOption] = useState<'all' | 'submit' | 'unSubmit'>('all');

  const handleClickOption = (key: 'all' | 'submit' | 'unSubmit') => {
    setOption(key);
    const clubs = filterOption[key];
    if (clubs) setFilteredClub(clubs);
  };

  return (
    <Flex className="gap-2 p-4 text-gray-400">
      {FILTERS.map(({ key, label }, index) => (
        <Caption1
          key={key}
          onClick={() => handleClickOption(key)}
          className={clsx(
            'cursor-pointer',
            key !== 'unSubmit' &&
              "after:pl-2 after:text-gray-300 after:content-['|']",
            option === key && 'text-blue-500',
          )}
        >
          {label}
        </Caption1>
      ))}
    </Flex>
  );
}
