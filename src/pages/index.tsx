import { useEffect, useState } from 'react';

import Slider from '@/components/common/Slider';
import ClubCard from '@/components/home/ClubCard';
import FilterCategory from '@/components/home/FilterCategory';
import SearchBar from '@/components/home/SearchBar';
import FilterOption from '@/components/modal/FilterOption';
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
    sortedClubs = resortSemiClub(sortedClubs);
    setClubs(sortedClubs);
    setFilteredClubs(sortedClubs);
  }, [data]);

  useEffect(() => {
    const filterClubs = () => {
      return clubs.filter((club) =>
        [club.name, club.tag, club.category].some((property) =>
          property.includes(keyword.toUpperCase()),
        ),
      );
    };

    setFilteredClubs(filterClubs());
  }, [clubs, keyword]);

  function resortSemiClub(sortedClubs: Club[]) {
    const semiClubs = sortedClubs.filter(
      (club) => club.category === '준동아리',
    );
    sortedClubs = sortedClubs.filter((club) => club.category !== '준동아리');
    sortedClubs = [...sortedClubs, ...semiClubs];
    return sortedClubs;
  }

  if (isError) {
    return <div>error</div>;
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
      <FilterCategory option={filterOption} setOption={setFilterOption} />
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
