import { GetServerSideProps } from 'next/types';
import Head from 'next/head';
import ClubHeading from '@/components/club/ClubHeading';
import BottomButton from '@/components/club/BottomButton';

const clubs = [
  {
    id: 1,
    name: '명지서법',
    tag: '서예',
    category: '학술',
  },
  {
    id: 2,
    name: 'TIME',
    tag: '영어',
    category: '학술',
  },
  {
    id: 3,
    name: 'MIRS',
    tag: '기업분석',
    category: '학술',
  },
  {
    id: 4,
    name: '통해',
    tag: '통기타',
    category: '언행예술',
  },
  {
    id: 5,
    name: '흑풍',
    tag: '흑인음악',
    category: '언행예술',
  },
  {
    id: 6,
    name: '주리랑',
    tag: '창작음악',
    category: '언행예술',
  },
  {
    id: 7,
    name: '화이트홀스',
    tag: '밴드',
    category: '언행예술',
  },
  {
    id: 8,
    name: 'MGH',
    tag: '댄스',
    category: '언행예술',
  },
  {
    id: 9,
    name: '극예술연구회 알',
    tag: '연극',
    category: '언행예술',
  },
  {
    id: 10,
    name: '너나들이',
    tag: '건축봉사',
    category: '봉사',
  },
  {
    id: 11,
    name: 'RCY',
    tag: '적십자',
    category: '봉사',
  },
  {
    id: 12,
    name: 'PTPI',
    tag: '연합활동',
    category: '봉사',
  },
  {
    id: 13,
    name: '키비탄',
    tag: '아동봉사',
    category: '봉사',
  },
  {
    id: 14,
    name: '코아',
    tag: '광고',
    category: '전시창작',
  },
  {
    id: 15,
    name: '디비전',
    tag: '영상',
    category: '전시창작',
  },
  {
    id: 16,
    name: '포토랩',
    tag: '사진',
    category: '전시창작',
  },
  {
    id: 17,
    name: '그림패시만화',
    tag: '그림',
    category: '전시창작',
  },
  {
    id: 18,
    name: '씨네메이션',
    tag: '서브컬쳐',
    category: '전시창작',
  },
  {
    id: 19,
    name: 'C.C.C',
    tag: '기독교',
    category: '종교',
  },
  {
    id: 20,
    name: '실로암',
    tag: '기독교',
    category: '종교',
  },
  {
    id: 21,
    name: 'CFM',
    tag: '수화찬양',
    category: '종교',
  },
  {
    id: 22,
    name: 'UBF',
    tag: '성경',
    category: '종교',
  },
  {
    id: 23,
    name: '대건안드레아',
    tag: '가톨릭',
    category: '종교',
  },
  {
    id: 24,
    name: '콕콕콕',
    tag: '배드민턴',
    category: '체육',
  },
  {
    id: 25,
    name: 'MJTA',
    tag: '테니스',
    category: '체육',
  },
  {
    id: 26,
    name: '바다이야기',
    tag: '스킨스쿠버',
    category: '체육',
  },
  {
    id: 27,
    name: '무릉도원',
    tag: '검도',
    category: '체육',
  },
  {
    id: 28,
    name: '나이너스',
    tag: '야구',
    category: '체육',
  },
  {
    id: 29,
    name: '삼박자',
    tag: '족구',
    category: '체육',
  },
  {
    id: 30,
    name: '굴렁쇠',
    tag: '자전거',
    category: '체육',
  },
  {
    id: 31,
    name: '파인',
    tag: '농구',
    category: '체육',
  },
  {
    id: 32,
    name: 'FC명지',
    tag: '축구',
    category: '체육',
  },
  {
    id: 33,
    name: '오버행',
    tag: '클라이밍',
    category: '체육',
  },
  {
    id: 34,
    name: '명지챌린저스',
    tag: '챌린지',
    category: '사회연구',
  },
  {
    id: 35,
    name: 'SK루키',
    tag: '소셜벤처',
    category: '사회연구',
  },
  {
    id: 36,
    name: '인액터스',
    tag: '사회문제',
    category: '사회연구',
  },
  {
    id: 37,
    name: '농어민후생연구회 흙',
    tag: '농활',
    category: '사회연구',
  },
  {
    id: 38,
    name: '비주얼',
    tag: '토론',
    category: '사회연구',
  },
];

type ClubDetailProps = {
  clubId: number;
};

export default function Index({ clubId }: ClubDetailProps) {
  const item = clubs[clubId - 1];
  return (
    <>
      <Head>
        <title>{`띵동 - ${item.name}`}</title>
      </Head>
      <ClubHeading name={item.name} category={item.category} tag={item.tag} />
      <main className="mt-10 md:mt-12">
        <section>
          <div className="text-xl font-bold md:text-2xl">
            우리 동아리를 소개할게요
          </div>
          <div className="mt-1 text-base font-medium text-gray-500 md:mt-2 md:text-lg">
            <p>안녕하세요, 명지대학교 대표 흑인음악 동아리 흑풍입니다.</p>
            <p>저희는 매주 금요일 합동연습과 회식을 진행해요.</p>
            <p>
              흑인음악을 사랑하시는 분들이라면 모두 환영입니다! 많은 관심
              부탁드려요!
            </p>
          </div>
        </section>
        <section className="mt-5 md:mt-6">
          <div className="text-xl font-bold md:text-2xl">
            이런 분과 함께하고 싶어요
          </div>
          <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-2 md:text-lg">
            <li>흑인음악을 사랑하시는 분</li>
            <li>동아리 활동에 적극적으로 참여하실 분</li>
            <li>매주 금요일 정기모임에 참석이 가능하신 분</li>
          </ul>
        </section>
      </main>
      <BottomButton href={'/'}>지원하기</BottomButton>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: {
  query: any;
}) => {
  const { id } = context.query;
  return {
    props: {
      clubId: id,
    },
  };
};
