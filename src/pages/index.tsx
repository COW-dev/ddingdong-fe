import { useEffect, useState } from 'react';

import Slider from '@/components/common/Slider';
import ClubCard from '@/components/home/ClubCard';
import SearchBar from '@/components/home/SearchBar';
import FilterOption from '@/components/modal/FilterOption';
import { CatogoryColor } from '@/constants/color';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import type { Club } from '@/types/club';

export default function Home() {
  const [keyword, setKeyword] = useState<string>('');
  const [clubs, setClubs] = useState<Array<Club>>([]);
  const [filteredClubs, setFilteredClubs] = useState<Array<Club>>([]);
  const { isError, data } = useAllClubs();
  const [filterOption, setFilterOption] = useState<{
    category: string[];
    recruit: string[];
    sort: boolean;
  }>({
    category: [],
    recruit: [],
    sort: true,
  });

  useEffect(() => {
    const clubList = data?.data ?? [];
    let sortedClubs = [...clubList].sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
    );
    const semiClubs = sortedClubs.filter(
      (club) => club.category === '준동아리',
    );
    sortedClubs = sortedClubs.filter((club) => club.category !== '준동아리');
    sortedClubs = [...sortedClubs, ...semiClubs];
    setClubs(sortedClubs);
    setFilteredClubs(sortedClubs);
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredClubs(
        clubs.filter(
          (club) =>
            club.name.includes(keyword.toUpperCase()) ||
            club.tag.includes(keyword.toUpperCase()) ||
            club.category === keyword,
        ),
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [clubs, keyword]);
  if (isError) {
    return <div>error</div>;
  }

  function filterCategory(item: string) {
    const updatedCategory = filterOption.category.includes(item)
      ? filterOption.category.filter((club) => club !== item)
      : [...filterOption.category, item];
    setFilterOption((prev) => ({ ...prev, category: updatedCategory }));
  }

  return (
    <>
      <div className="mb-1.5 text-sm font-semibold md:mb-2 md:text-base">
        <Slider />
      </div>
      <SearchBar value={keyword} onChange={setKeyword} />
      <div className="flex justify-between">
        <div className="mb-1.5 flex items-end text-sm font-semibold text-gray-500 md:mb-2 md:text-base">
          총 {filteredClubs.length}개의 동아리
        </div>
        <FilterOption
          clubs={clubs}
          filteredClubs={filteredClubs}
          setFilteredClubs={setFilteredClubs}
          option={filterOption}
          setOption={setFilterOption}
        />
      </div>

      <div className="my-2 hidden w-full rounded-xl bg-gray-50 p-2 px-4 font-semibold text-gray-500 md:flex">
        <span
          className={`cursor-pointer ${
            filterOption.category.length === 0 && 'text-blue-500'
          }`}
          onClick={() => setFilterOption((prev) => ({ ...prev, category: [] }))}
        >
          전체
        </span>
        {CatogoryColor.map((category, index) => (
          <div
            onClick={() => filterCategory(category.title)}
            className={`cursor-pointer before:p-2 before:text-gray-300 before:content-['|'] ${
              filterOption.category.includes(category.title) && 'text-blue-500'
            }`}
            key={`category${index}`}
          >
            {category.title}
          </div>
        ))}
      </div>

      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {filteredClubs.map((club) => (
          <ClubCard
            key={club.id}
            id={club.id}
            name={club.name}
            category={club.category}
            tag={club.tag}
            recruitStatus={club.recruitStatus}
          />
        ))}
      </ul>
    </>
  );
}
