export type RecruitStatus = '모집 중' | '모집 마감' | '모집 예정';
export type ClubTag =
  | '봉사'
  | '사회연구'
  | '연행예술'
  | '전시창작'
  | '종교'
  | '체육'
  | '학술'
  | '준동아리';

export type Club = {
  id: number;
  name: string;
  category: string;
  tag: ClubTag;
  recruitStatus: RecruitStatus;
};
