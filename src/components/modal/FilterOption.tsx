import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import CheckboxImg from '@/assets/checkbox.svg';
import { CatogoryColor } from '@/constants/color';
import { Club } from '@/types';
import CheckBox from '../home/CheckBox';
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
  const [recruitClubList, setRecruitClubList] = useState<Club[]>(
    filteredClubs ?? clubs,
  );
  const [categoryClubList, setCategoryClubList] = useState<Club[]>(
    filteredClubs ?? clubs,
  );
  const { category, recruit, sort } = option;
  const [isFilter, setIsFilter] = useState<boolean>(false);

  useEffect(() => {
    handleList();
    handleFilter();
  }, [category, recruit, sort]);

  useEffect(() => {
    handleFilter();
  }, [recruitClubList, categoryClubList]);

  function handleFilter() {
    const filtered = recruitClubList.filter((item) =>
      categoryClubList.includes(item),
    );
    const sortedClubs = sortClubsByCategory(filtered);
    setFilteredClubs(sortedClubs);
  }

  function filterRecruitPeriod(item: string) {
    const updatedRecruit = recruit.includes(item)
      ? recruit.filter((club) => club !== item)
      : [...recruit, item];
    setOption((prev) => ({ ...prev, recruit: updatedRecruit }));
  }

  function filterCategory(item: string) {
    const updatedCategory = category.includes(item)
      ? category.filter((club) => club !== item)
      : [...category, item];
    setOption((prev) => ({ ...prev, category: updatedCategory }));
  }

  function handleList() {
    const filterRecuitList = [];
    const filterCategoryList = [];
    for (const club of clubs) {
      if (recruit.includes(club.recruitStatus)) {
        filterRecuitList.push(club);
      }
      if (category.includes(club.category)) {
        filterCategoryList.push(club);
      }
    }
    setRecruitClubList(recruit.length === 0 ? clubs : filterRecuitList);
    setCategoryClubList(category.length === 0 ? clubs : filterCategoryList);
  }

  const sortClubsByCategory = (clubs: Club[]) => {
    return clubs.sort((a, b) =>
      sort
        ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name),
    );
  };

  const [active, setActive] = useState<string>('');
  function handleOption(item: string) {
    setActive(item);
    item === active && isFilter ? setIsFilter(false) : setIsFilter(true);
  }

  return (
    <div
      className="mb-5 rounded-xl bg-gray-50 px-2 text-sm hover:cursor-pointer md:text-base"
      tabIndex={0}
      onBlur={() => setIsFilter(false)}
    >
      <div className="flex flex-row-reverse">
        {['카테고리', '정렬', '모집기준'].map((item) => (
          <div
            key={`filter-${item}`}
            onClick={() => handleOption(item)}
            className={`m-2 gap-1 p-1 font-semibold ${
              item === active ? `border-b text-blue-500` : `text-gray-500`
            }`}
          >
            <span> {item}</span>
          </div>
        ))}
      </div>
      <div className="relative m-auto flex max-w-6xl flex-row-reverse">
        {isFilter && (
          <div className="absolute w-50  rounded-xl bg-white p-2 shadow-xl">
            {active === '모집기준' && (
              <div>
                <div
                  onClick={() =>
                    setOption((prev) => ({ ...prev, recruit: [] }))
                  }
                  key={`recruit-option_all`}
                >
                  <label className="w-46 mx-1 flex items-center justify-center gap-2 rounded-md p-1 hover:bg-gray-100 ">
                    {recruit.length === 0 ? (
                      <Image
                        src={CheckboxImg}
                        width={18}
                        height={18}
                        alt="checkbox"
                      />
                    ) : (
                      <div className="h-4 w-4 rounded-sm border border-gray-400"></div>
                    )}
                    <span className="w-[50%] py-1 ">전체 선택</span>
                  </label>
                </div>
                {['모집 마감', '모집 중', '모집 예정'].map((recruitType) => (
                  <div
                    onClick={() => filterRecruitPeriod(recruitType)}
                    key={`recruit-option_${recruitType}`}
                  >
                    <CheckBox title={recruitType} list={option.recruit} />
                  </div>
                ))}
              </div>
            )}
            {active === '정렬' && (
              <div>
                <div
                  onClick={() =>
                    setOption((prev) => ({ ...prev, sort: false }))
                  }
                  className={`rounded-xl p-2 px-5  ${
                    option.sort ? `opacity-50` : `bg-gray-100 opacity-100`
                  }`}
                >
                  동아리명으로 정렬
                </div>
                <div
                  onClick={() => setOption((prev) => ({ ...prev, sort: true }))}
                  className={`rounded-xl p-2 px-5 ${
                    option.sort ? `bg-gray-100 opacity-100` : `opacity-50`
                  }`}
                >
                  카테고리로 정렬
                </div>
              </div>
            )}

            {active === '카테고리' && (
              <div>
                <div
                  onClick={() =>
                    setOption((prev) => ({ ...prev, category: [] }))
                  }
                  key={`category-option_all`}
                >
                  <label className="w-46 mx-1 flex items-center justify-center gap-2 rounded-md p-1 hover:bg-gray-100 ">
                    {category.length === 0 ? (
                      <Image
                        src={CheckboxImg}
                        width={18}
                        height={18}
                        alt="checkbox"
                      />
                    ) : (
                      <div className="h-4 w-4 rounded-sm border border-gray-400"></div>
                    )}
                    <span className="w-[50%] py-1 ">전체 선택</span>
                  </label>
                </div>
                {CatogoryColor.map((categoryItem) => (
                  <div
                    onClick={() => filterCategory(categoryItem.title)}
                    key={`category-option_${categoryItem.title}`}
                  >
                    <CheckBox
                      title={categoryItem.title}
                      list={option.category}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
