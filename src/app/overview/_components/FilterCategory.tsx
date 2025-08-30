import { Body3, Flex } from 'ddingdong-design-system';

import { CategoryColor } from '@/constants/color';
import { cn } from '@/lib/utils';

type FilterCategoryProps = {
  option: string[];
  onOptionSelect: (option: string[]) => void;
};

export function FilterCategory({
  option,
  onOptionSelect,
}: FilterCategoryProps) {
  const filterCategory = (item: string) => {
    const updatedCategory = option.includes(item)
      ? option.filter((club) => club !== item)
      : [...option, item];
    onOptionSelect(updatedCategory);
  };

  return (
    <Flex className="my-2 hidden w-full rounded-xl bg-gray-50 px-4 py-2 font-semibold text-gray-500 md:flex">
      <Body3
        className={cn('cursor-pointer', option.length === 0 && 'text-blue-500')}
        onClick={() => onOptionSelect([])}
      >
        전체
      </Body3>
      {CategoryColor.map((category, index) => (
        <Body3
          key={index}
          onClick={() => filterCategory(category.title)}
          className={`cursor-pointer before:p-2 before:text-gray-300 before:content-['|'] ${
            option.includes(category.title) && 'text-blue-500'
          }`}
        >
          {category.title}
        </Body3>
      ))}
    </Flex>
  );
}

export default FilterCategory;
