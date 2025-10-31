'use client';

import { useCallback, useState } from 'react';
import { Club } from '@/app/_api/types/club';
import { Caption1, cn, Flex } from 'ddingdong-design-system';

type FilterKey = 'all' | 'submit' | 'unSubmit';
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'submit', label: '제출완료' },
  { key: 'unSubmit', label: '미제출' },
];

type Props = {
  filterOption: Record<FilterKey, Club[]>;
  setFilteredClub: (clubs: Club[]) => void;
};
export default function FilterOption({ filterOption, setFilteredClub }: Props) {
  const [selected, setSelected] = useState<FilterKey>('all');

  const handleSelect = useCallback(
    (key: FilterKey) => {
      setSelected(key);
      setFilteredClub(filterOption[key]);
    },
    [filterOption, setFilteredClub],
  );

  return (
    <Flex className="gap-3 p-4 text-gray-400">
      {FILTERS.map(({ key, label }) => (
        <Caption1
          weight="semibold"
          key={key}
          onClick={() => handleSelect(key)}
          className={cn(
            'cursor-pointer',
            key !== 'unSubmit' &&
              "after:pl-3 after:text-gray-300 after:content-['|']",
            selected === key && 'text-blue-500',
          )}
        >
          {label}
        </Caption1>
      ))}
    </Flex>
  );
}
