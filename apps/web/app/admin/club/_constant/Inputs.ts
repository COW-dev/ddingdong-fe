export const INPUT_FIELDS = [
  {
    id: 'clubName',
    name: 'clubName',
    label: '동아리명',
    placeholder: '동아리명을 입력하세요',
    type: 'text' as const,
  },
  {
    id: 'leaderName',
    name: 'leaderName',
    label: '대표자',
    placeholder: '대표자명을 입력하세요',
    type: 'text' as const,
  },
  {
    id: 'tag',
    name: 'tag',
    label: '태그',
    placeholder: '태그를 입력하세요',
    type: 'text' as const,
  },
  {
    id: 'authId',
    name: 'authId',
    label: '아이디',
    placeholder: '아이디를 입력하세요',
    type: 'text' as const,
  },
  {
    id: 'password',
    name: 'password',
    label: '비밀번호',
    placeholder: '영어/숫자 조합 8자리 이상',
    type: 'password' as const,
  },
];

export const CATEGORY_OPTIONS = [
  '봉사',
  '사회연구',
  '연행예술',
  '전시창작',
  '종교',
  '체육',
  '학술',
  '준동아리',
] as const;
