import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import CheckboxImg from '@/assets/checkbox.svg';
import { CatogoryColor } from '@/constants/color';
import CheckBox from '../../home/CheckBox';

type Props = {
  setOption: Dispatch<
    SetStateAction<{ category: string[]; recruit: string[]; sort: boolean }>
  >;
  option: { category: string[]; recruit: string[]; sort: boolean };
  filterOption: (
    item: string,
    option: string[],
    setOptionCallback: (updatedOption: string[]) => void,
  ) => void;
};

function Category({ setOption, option, filterOption }: Props) {
  const { category } = option;

  function fillCheckBox() {
    if (category.length === 0) {
      return <Image src={CheckboxImg} width={18} height={18} alt="checkbox" />;
    }
    return <div className="h-4 w-4 rounded-sm border border-gray-400"></div>;
  }

  function handleClickOption(title: string) {
    filterOption(title, category, (updatedCategory) => {
      setOption((prev) => ({
        ...prev,
        category: updatedCategory,
      }));
    });
  }

  return (
    <div className="md:hidden">
      <div
        onClick={() => setOption((prev) => ({ ...prev, category: [] }))}
        key={`category-option_all`}
      >
        <label className="w-46 mx-1 flex items-center justify-center gap-2 rounded-md p-1 hover:bg-gray-100 ">
          {fillCheckBox()}
          <span className="w-[50%] py-1 ">전체 선택</span>
        </label>
      </div>
      {CatogoryColor.map((categoryItem) => (
        <div
          onClick={() => handleClickOption(categoryItem.title)}
          key={`category-option_${categoryItem.title}`}
        >
          <CheckBox title={categoryItem.title} list={option.category} />
        </div>
      ))}
    </div>
  );
}

export default Category;
