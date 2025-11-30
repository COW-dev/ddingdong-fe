'use client';

import { Body3 } from 'ddingdong-design-system';

import { Club } from '@/app/_api/types/club';

import { ClubCard } from '../_components/ClubCard';
import { ClubFilter } from '../_components/ClubFilter';
import { FilterCategory } from '../_components/FilterCategory';
import { SearchBar } from '../_components/SearchBar';
import { ClubContainer } from '../_containers/ClubContainer';
import { useClubFilter } from '../_hooks/useClubFilter';
import { useClubSearch } from '../_hooks/useClubSearch';
import { useFilteredClubs } from '../_hooks/useFilteredClubs';

export function OverviewClientPage({ clubs }: { clubs: Club[] }) {
  const { searchClub, handleSearchClub } = useClubSearch();
  const {
    filterOption,
    handleCategoryChange,
    handleRecruitChange,
    handleSortChange,
  } = useClubFilter();
  const filteredClubs = useFilteredClubs(clubs, searchClub, filterOption);

  return (
    <>
      <SearchBar value={searchClub} onSearch={handleSearchClub} />
      <ClubFilter
        club={filteredClubs}
        recruit={filterOption.recruit}
        sort={filterOption.sort}
        onRecruit={handleRecruitChange}
        onSort={handleSortChange}
      />
      <FilterCategory
        option={filterOption.category}
        onOptionSelect={handleCategoryChange}
      />

      <ClubContainer>
        {filteredClubs.length === 0 ? (
          <Body3 className="col-span-full py-10 text-center text-gray-400">
            검색 결과가 없습니다.
          </Body3>
        ) : (
          filteredClubs.map((club) => <ClubCard key={club.id} {...club} />)
        )}
      </ClubContainer>
    </>
  );
}
