import React, { Dispatch, SetStateAction } from 'react';
import { CatogoryColor } from '@/constants/color';

type Props = {
  option: { category: string[]; recruit: string[]; sort: boolean };
  setOption: Dispatch<
    SetStateAction<{ category: string[]; recruit: string[]; sort: boolean }>
  >;
};

function FilterCategory({ option, setOption }: Props) {
  function filterCategory(item: string) {
    const updatedCategory = option.category.includes(item)
      ? option.category.filter((club) => club !== item)
      : [...option.category, item];
    setOption((prev) => ({ ...prev, category: updatedCategory }));
  }

  return (
    <div className="my-2 hidden w-full rounded-xl bg-gray-50 p-2 px-4 font-semibold text-gray-500 md:flex">
      <span
        className={`cursor-pointer ${
          option.category.length === 0 && 'text-christmas-red'
        }`}
        onClick={() => setOption((prev) => ({ ...prev, category: [] }))}
      >
        전체
      </span>
      {CatogoryColor.map((category, index) => (
        <div
          onClick={() => filterCategory(category.title)}
          className={`cursor-pointer before:p-2 before:text-gray-300 before:content-['|'] ${
            option.category.includes(category.title) && 'text-christmas-red'
          }`}
          key={`category${index}`}
        >
          {category.title}
        </div>
      ))}
    </div>
  );
}

export default FilterCategory;
