import { RecruitStatus } from '@/app/_api/types/club';

import { SortOption } from '../_components/ClubFilter';

export type ClubFilterOptions = {
  category: string[];
  recruit: '전체' | RecruitStatus;
  sort: SortOption;
};
