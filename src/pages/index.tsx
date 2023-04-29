import { useEffect, useState } from 'react';
import Banner from '@/components/home/Banner';
import ClubCard from '@/components/home/ClubCard';
import SearchBar from '@/components/home/SearchBar';
import type { ClubType } from '@/types';

const clubs = [
  {
    id: 1,
    clubName: '명지서법',
    tag: '서예',
    category: '학술',
  },
  {
    id: 2,
    clubName: 'TIME',
    tag: '영어',
    category: '학술',
  },
  {
    id: 3,
    clubName: 'MIRS',
    tag: '기업분석',
    category: '학술',
  },
  {
    id: 4,
    clubName: '통해',
    tag: '통기타',
    category: '연행예술',
  },
  {
    id: 5,
    clubName: '흑풍',
    tag: '흑인음악',
    category: '연행예술',
  },
  {
    id: 6,
    clubName: '주리랑',
    tag: '창작음악',
    category: '연행예술',
  },
  {
    id: 7,
    clubName: '화이트홀스',
    tag: '밴드',
    category: '연행예술',
  },
  {
    id: 8,
    clubName: 'MGH',
    tag: '댄스',
    category: '연행예술',
  },
  {
    id: 9,
    clubName: '극예술연구회 알',
    tag: '연극',
    category: '연행예술',
  },
  {
    id: 10,
    clubName: '너나들이',
    tag: '건축봉사',
    category: '봉사',
  },
  {
    id: 11,
    clubName: 'RCY',
    tag: '적십자',
    category: '봉사',
  },
  {
    id: 12,
    clubName: 'PTPI',
    tag: '연합활동',
    category: '봉사',
  },
  {
    id: 13,
    clubName: '키비탄',
    tag: '아동봉사',
    category: '봉사',
  },
  {
    id: 14,
    clubName: '코아',
    tag: '광고',
    category: '전시창작',
  },
  {
    id: 15,
    clubName: '디비전',
    tag: '영상',
    category: '전시창작',
  },
  {
    id: 16,
    clubName: '포토랩',
    tag: '사진',
    category: '전시창작',
  },
  {
    id: 17,
    clubName: '그림패시만화',
    tag: '그림',
    category: '전시창작',
  },
  {
    id: 18,
    clubName: '씨네메이션',
    tag: '서브컬쳐',
    category: '전시창작',
  },
  {
    id: 19,
    clubName: 'C.C.C',
    tag: '기독교',
    category: '종교',
  },
  {
    id: 20,
    clubName: '실로암',
    tag: '기독교',
    category: '종교',
  },
  {
    id: 21,
    clubName: 'CFM',
    tag: '수화찬양',
    category: '종교',
  },
  {
    id: 22,
    clubName: 'UBF',
    tag: '성경',
    category: '종교',
  },
  {
    id: 23,
    clubName: '대건안드레아',
    tag: '가톨릭',
    category: '종교',
  },
  {
    id: 24,
    clubName: '콕콕콕',
    tag: '배드민턴',
    category: '체육',
  },
  {
    id: 25,
    clubName: 'MJTA',
    tag: '테니스',
    category: '체육',
  },
  {
    id: 26,
    clubName: '바다이야기',
    tag: '스킨스쿠버',
    category: '체육',
  },
  {
    id: 27,
    clubName: '무릉도원',
    tag: '검도',
    category: '체육',
  },
  {
    id: 28,
    clubName: '나이너스',
    tag: '야구',
    category: '체육',
  },
  {
    id: 29,
    clubName: '삼박자',
    tag: '족구',
    category: '체육',
  },
  {
    id: 30,
    clubName: '굴렁쇠',
    tag: '자전거',
    category: '체육',
  },
  {
    id: 31,
    clubName: '파인',
    tag: '농구',
    category: '체육',
  },
  {
    id: 32,
    clubName: 'FC명지',
    tag: '축구',
    category: '체육',
  },
  {
    id: 33,
    clubName: '오버행',
    tag: '클라이밍',
    category: '체육',
  },
  {
    id: 34,
    clubName: '명지챌린저스',
    tag: '챌린지',
    category: '사회연구',
  },
  {
    id: 35,
    clubName: 'SK루키',
    tag: '소셜벤처',
    category: '사회연구',
  },
  {
    id: 36,
    clubName: '인액터스',
    tag: '사회문제',
    category: '사회연구',
  },
  {
    id: 37,
    clubName: '농어민후생연구회 흙',
    tag: '농활',
    category: '사회연구',
  },
  {
    id: 38,
    clubName: '비주얼',
    tag: '토론',
    category: '사회연구',
  },
];

export default function Home() {
  const [keyword, setKeyword] = useState<string>('');
  const [clubArr, setClubArr] = useState<Array<ClubType>>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClubArr(
        clubs.filter(
          (club) =>
            club.clubName.includes(keyword.toUpperCase()) ||
            club.tag.includes(keyword) ||
            club.category === keyword,
        ),
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [keyword]);

  return (
    <>
      <Banner />
      <SearchBar value={keyword} onChange={setKeyword} />
      <div className="mb-1.5 text-sm font-semibold text-gray-500 md:mb-2 md:text-base">
        총 {clubArr.length}개의 동아리
      </div>
      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {clubArr.map((club) => (
          <ClubCard
            key={club.id}
            id={club.id}
            name={club.clubName}
            category={club.category}
            tag={club.tag}
          />
        ))}
      </ul>
    </>
  );
}
