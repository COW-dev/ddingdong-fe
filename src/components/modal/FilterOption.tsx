import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Club } from '@/types';
import Category from './filter/Category';
import RecruitStatus from './filter/RecruitStatus';
import Sort from './filter/Sort';

type Props = {
  clubs: Club[];
  filteredClubs: Club[];
  setFilteredClubs: Dispatch<SetStateAction<Club[]>>;
  option: { category: string[]; recruit: string[]; sort: boolean };
  setOption: Dispatch<
    SetStateAction<{ category: string[]; recruit: string[]; sort: boolean }>
  >;
};

export default function FilterOption({
  clubs,
  setFilteredClubs,
  filteredClubs,
  option,
  setOption,
}: Props) {
  const filteredList = filteredClubs ?? clubs;
  const [recruitClubList, setRecruitClubList] = useState<Club[]>(filteredList);
  const [categoryClubList, setCategoryClubList] =
    useState<Club[]>(filteredList);
  const { category, recruit, sort } = option;
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    handleList();
    handleFilter();
  });

  function handleFilter() {
    const filtered = recruitClubList.filter((item) =>
      categoryClubList.includes(item),
    );
    const sortedClubs = sortClubsByCategory(filtered);
    setFilteredClubs(sortedClubs);
  }

  function filterOption(
    item: string,
    option: string[],
    setOptionCallback: (updatedOption: string[]) => void,
  ) {
    const updatedOption = option.includes(item)
      ? option.filter((value) => value !== item)
      : [...option, item];
    setOptionCallback(updatedOption);
  }

  function handleList() {
    const filterList = (
      filterValues: string[],
      property: 'recruitStatus' | 'category',
    ) => {
      if (filterValues.length === 0) {
        return clubs;
      }
      return clubs.filter((club) => filterValues.includes(club[property]));
    };
    const filteredRecruitList = filterList(recruit, 'recruitStatus');
    const filteredCategoryList = filterList(category, 'category');
    setRecruitClubList(filteredRecruitList);
    setCategoryClubList(filteredCategoryList);
  }

  const sortClubsByCategory = (clubs: Club[]) => {
    return clubs.sort((a, b) =>
      sort
        ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name),
    );
  };

  function handleOption(item: string) {
    setActive(item);
    item === active && isFilter ? focusoutOption() : setIsFilter(true);
  }

  function focusoutOption() {
    setIsFilter(false);
    setActive('');
  }

  return (
    <div tabIndex={0} onBlur={focusoutOption}>
      <div className="flex flex-row-reverse gap-2">
        {['카테고리', '정렬', '모집기준'].map((item) => (
          <div
            key={`filter-${item}`}
            onClick={() => handleOption(item)}
            className={`mb-1.5 cursor-pointer font-semibold  md:mb-2 ${
              item === active ? `border-b text-blue-500` : `text-gray-500`
            } ${item === '카테고리' && 'md:hidden'}`}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="relative m-auto flex max-w-6xl flex-row-reverse">
        {isFilter && (
          <div className="absolute w-44  rounded-xl bg-white p-2 shadow-xl">
            {active === '모집기준' && (
              <RecruitStatus
                setOption={setOption}
                option={option}
                filterOption={filterOption}
              />
            )}
            {active === '정렬' && (
              <Sort setOption={setOption} option={option} />
            )}
            {active === '카테고리' && (
              <Category
                setOption={setOption}
                option={option}
                filterOption={filterOption}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
