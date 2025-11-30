import { useState } from 'react';

export const useClubSearch = () => {
  const [searchClub, setSearchClub] = useState('');

  const handleSearchClub = (keyword: string) => {
    setSearchClub(keyword);
  };

  return {
    searchClub,
    handleSearchClub,
  };
};
