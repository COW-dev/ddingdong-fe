import { Body3, Flex, Select } from 'ddingdong-design-system';

import { Club, RecruitStatus } from '@/app/_api/types/club';

import { ClubFilterOptions } from '../_types/club';

export type FilterProps = {
  club: Club[];
  onRecruit: (recruit: '전체' | RecruitStatus) => void;
  onSort: (sort: SortOption) => void;
} & Omit<ClubFilterOptions, 'category'>;

export const RECRUIT_OPTIONS: ('전체' | RecruitStatus)[] = [
  '전체',
  '모집 마감',
  '모집 중',
  '모집 예정',
] as const;

export const SORT_OPTIONS = ['동아리명', '카테고리'] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export function ClubFilter({
  club,
  recruit,
  sort,
  onRecruit,
  onSort,
}: FilterProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="between"
      className="my-2 px-2 text-gray-400"
    >
      <Body3 className="cursor-default">
        총 {club?.length ?? 0}개의 동아리
      </Body3>
      <Flex gap={3}>
        <Select
          value={recruit}
          onChange={(value) => onRecruit(value as '전체' | RecruitStatus)}
          size="md"
          defaultValue="모집 기준"
        >
          {RECRUIT_OPTIONS.map((item, index) => (
            <Select.Option key={index} name={item} />
          ))}
        </Select>
        <Select
          value={sort}
          onChange={(value) => onSort(value as SortOption)}
          size="md"
          defaultValue="정렬"
        >
          {SORT_OPTIONS.map((item, index) => (
            <Select.Option key={index} name={item} />
          ))}
        </Select>
      </Flex>
    </Flex>
  );
}
