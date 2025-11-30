import { useMemo } from 'react';

import { Club } from '@/app/_api/types/club';

import { ClubFilterOptions } from '../_types/club';

export const useFilteredClubs = (
  clubs: Club[],
  searchKeyword: string,
  filterOptions: ClubFilterOptions,
) => {
  return useMemo(() => {
    if (!clubs) return [];

    let filteredClubs = clubs.filter((club) =>
      club.name.toLowerCase().includes(searchKeyword.toLowerCase()),
    );

    if (filterOptions.category.length > 0) {
      filteredClubs = filteredClubs.filter((club) =>
        filterOptions.category.includes(club.category),
      );
    }

    if (filterOptions.recruit) {
      filteredClubs = filteredClubs.filter((club) => {
        if (filterOptions.recruit === '전체') {
          return true;
        }
        return filterOptions.recruit === club.recruitStatus;
      });
    }

    if (filterOptions.sort) {
      if (filterOptions.sort === '동아리명')
        return [...filteredClubs].sort((a, b) => a.name.localeCompare(b.name));

      if (filterOptions.sort === '카테고리') {
        const regularClubs = filteredClubs.filter(
          (club) => club.category !== '준동아리',
        );
        const sortedRegularClubs = regularClubs.sort((a, b) =>
          a.category.localeCompare(b.category),
        );

        const semiClubs = filteredClubs.filter(
          (club) => club.category === '준동아리',
        );

        return [...sortedRegularClubs, ...semiClubs];
      }
    }

    return filteredClubs;
  }, [clubs, searchKeyword, filterOptions]);
};
