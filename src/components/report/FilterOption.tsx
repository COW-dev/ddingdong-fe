import { useState } from 'react';
import { Club } from '@/types';
import { cn } from '../ui/utils';

type FilterOptionProps = {
  filterOption: {
    all?: Club[];
    submit?: Club[];
    unSubmit?: Club[];
  };
  setFilteredClub: (clubs: Club[]) => void;
};

function FilterOption({ setFilteredClub, filterOption }: FilterOptionProps) {
  const [option, setOption] = useState<'all' | 'submit' | 'unSubmit'>('all');

  const handleClickOption = (
    option: 'all' | 'submit' | 'unSubmit',
    clubs: Club[] | undefined,
  ) => {
    setOption(option);
    if (clubs) setFilteredClub(clubs);
  };

  return (
    <div className="flex w-full gap-2 rounded-xl p-4 font-semibold text-gray-400 md:flex">
      <span
        onClick={() => handleClickOption('all', filterOption.all)}
        className={cn(
          `cursor-pointer after:pl-2 after:text-gray-300 after:content-['|']`,
          option === 'all' && 'text-blue-500',
        )}
      >
        전체
      </span>
      <span
        onClick={() => handleClickOption('submit', filterOption.submit)}
        className={cn(
          `cursor-pointer after:pl-2 after:text-gray-300 after:content-['|']`,
          option === 'submit' && 'text-blue-500',
        )}
      >
        제출완료
      </span>
      <span
        onClick={() => handleClickOption('unSubmit', filterOption.unSubmit)}
        className={cn(
          `cursor-pointer`,
          option === 'unSubmit' && 'text-blue-500',
        )}
      >
        미제출
      </span>
    </div>
  );
}

export default FilterOption;
