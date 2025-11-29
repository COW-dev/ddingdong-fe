import { useState } from 'react';

import { RecruitStatus } from '@/app/_api/types/club';

import { SortOption } from '../_components/ClubFilter';
import { ClubFilterOptions } from '../_types/club';

export const useClubFilter = () => {
  const [filterOption, setFilterOption] = useState<ClubFilterOptions>({
    category: [],
    recruit: '전체',
    sort: '카테고리',
  });

  const handleCategoryChange = (selectedCategories: string[]) => {
    setFilterOption((prev) => ({
      ...prev,
      category: selectedCategories,
    }));
  };

  const handleRecruitChange = (selectedRecruit: '전체' | RecruitStatus) => {
    setFilterOption((prev) => ({
      ...prev,
      recruit: selectedRecruit,
    }));
  };

  const handleSortChange = (selectedSort: SortOption) => {
    setFilterOption((prev) => ({
      ...prev,
      sort: selectedSort,
    }));
  };

  return {
    filterOption,
    handleCategoryChange,
    handleRecruitChange,
    handleSortChange,
  };
};
