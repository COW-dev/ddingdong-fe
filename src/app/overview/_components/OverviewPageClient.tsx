'use client';
import { useSuspenseQueries } from '@tanstack/react-query';

import { bannerQueryOptions } from '@/app/_api/queries/banner';
import { clubQueryOptions } from '@/app/_api/queries/club';

import { ClubContainer } from '../_containers/ClubContainer';
import { useClubFilter } from '../_hooks/useClubFilter';
import { useClubSearch } from '../_hooks/useClubSearch';
import { useFilteredClubs } from '../_hooks/useFilteredClubs';

import { ClubCard } from './ClubCard';
import { ClubCarousel } from './ClubCarousel';
import { ClubFilter } from './ClubFilter';
import { FilterCategory } from './FilterCategory';
import { SearchBar } from './SearchBar';

export function OverviewPageClient() {
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
        {filteredClubs?.map((club) => (
          <ClubCard key={club.id} {...club} />
        ))}
      </ClubContainer>
    </>
  );
}
