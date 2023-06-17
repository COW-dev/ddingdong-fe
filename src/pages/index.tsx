import { useEffect, useState } from 'react';
import Banner from '@/components/home/Banner';
import ClubCard from '@/components/home/ClubCard';
import SearchBar from '@/components/home/SearchBar';
import { useAllClubs } from '@/hooks/useAllClubs';
import type { ClubType } from '@/types';

export default function Home() {
  const [keyword, setKeyword] = useState<string>('');
  const [clubs, setClubs] = useState<Array<ClubType>>([]);
  const [filteredClubs, setFilteredClubs] = useState<Array<ClubType>>([]);
  const { isError, data } = useAllClubs();

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
            club.tag.includes(keyword) ||
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
      <Banner />
      <SearchBar value={keyword} onChange={setKeyword} />
      <div className="mb-1.5 text-sm font-semibold text-gray-500 md:mb-2 md:text-base">
        총 {filteredClubs.length}개의 동아리
      </div>
      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {filteredClubs.map((club) => (
          <ClubCard
            key={club.id}
            id={club.id}
            name={club.name}
            category={club.category}
            tag={club.tag}
          />
        ))}
      </ul>
    </>
  );
}
