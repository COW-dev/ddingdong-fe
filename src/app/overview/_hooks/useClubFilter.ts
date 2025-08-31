import { useState } from 'react';

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

  const handleRecruitChange = (selectedRecruit: string) => {
    setFilterOption((prev) => ({
      ...prev,
      recruit: selectedRecruit,
    }));
  };

  const handleSortChange = (selectedSort: string) => {
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
