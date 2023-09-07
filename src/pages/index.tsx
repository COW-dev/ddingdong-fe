import { useEffect, useState } from 'react';
import Image from 'next/image';
import Filter from '@/assets/filter.svg';

import Slider from '@/components/common/Slider';
import ClubCard from '@/components/home/ClubCard';
import SearchBar from '@/components/home/SearchBar';
import FilterOption from '@/components/modal/FilterOption';
import { useAllClubs } from '@/hooks/api/club/useAllClubs';
import type { Club } from '@/types/club';

export default function Home() {
  const [keyword, setKeyword] = useState<string>('');
  const [clubs, setClubs] = useState<Array<Club>>([]);
  const [isFilter, setIsFilter] = useState<boolean>(false);
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
    setClubs(data?.data ?? []);
    setFilteredClubs(data?.data ?? []);
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
        <div
          className=" flex items-center gap-1 rounded-xl hover:font-bold hover:text-blue-500"
          onClick={() => setIsFilter(!isFilter)}
        >
          <Image src={Filter} width={20} height={20} alt="필터" />
          <div className="text-sm md:text-base">
            {isFilter ? `마치기` : `필터`}
          </div>
        </div>
      </div>
      {isFilter && (
        <FilterOption
          clubs={clubs}
          filteredClubs={filteredClubs}
          setFilteredClubs={setFilteredClubs}
          option={filterOption}
          setOption={setFilterOption}
        />
      )}
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
