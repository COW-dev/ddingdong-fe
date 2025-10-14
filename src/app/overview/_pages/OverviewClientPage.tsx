'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { Body3 } from 'ddingdong-design-system';

import { bannerQueryOptions } from '@/app/_api/queries/banner';
import { clubQueryOptions } from '@/app/_api/queries/club';

import { ClubContainer } from '../_containers/ClubContainer';
import { useClubFilter } from '../_hooks/useClubFilter';
import { useClubSearch } from '../_hooks/useClubSearch';
import { useFilteredClubs } from '../_hooks/useFilteredClubs';

import { ClubCard } from '../_components/ClubCard';
import { ClubCarousel } from '../_components/ClubCarousel';
import { ClubFilter } from '../_components/ClubFilter';
import { FilterCategory } from '../_components/FilterCategory';
import { SearchBar } from '../_components/SearchBar';

export function OverviewClientPage() {
  const [{ data: clubData }, { data: bannerData }] = useSuspenseQueries({
    queries: [clubQueryOptions.all(), bannerQueryOptions.all()],
  });

  const { searchClub, handleSearchClub } = useClubSearch();
  const {
    filterOption,
    handleCategoryChange,
    handleRecruitChange,
    handleSortChange,
  } = useClubFilter();
  const filteredClubs = useFilteredClubs(clubData, searchClub, filterOption);

  return (
    <>
      <ClubCarousel bannerData={bannerData} />
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
