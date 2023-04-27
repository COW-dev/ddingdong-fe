import Head from 'next/head';
import type { GetServerSideProps } from 'next/types';
import BottomButton from '@/components/club/BottomButton';
import ClubHeading from '@/components/club/ClubHeading';

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

type ClubDetailProps = {
  clubId: number;
};

export default function Index({ clubId }: ClubDetailProps) {
  const club = clubs[clubId - 1];
  return (
    <>
      <Head>
        <title>{`띵동 - ${club.clubName}`}</title>
      </Head>
      <ClubHeading
        name={club.clubName}
        category={club.category}
        tag={club.tag}
        href={'/'}
      />
      <main className="w-full lg:w-[75%]">
        <section className="mt-6 md:mt-8">
          <div className="text-lg font-bold md:text-xl">
            우리 동아리를 소개할게요
          </div>
          <div className="mt-1 text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
            <p>
              안녕하세요, 저희는 2022년에 창립된 명지대학교 인문캠퍼스 중앙
              흑인음악 동아리 흑풍입니다.
            </p>
            <p>저희는 주로 힙합과 R&B 장르를 다루고 있습니다.</p>
            <p>
              다양한 무대와 사이퍼 제작, 뮤직비디오 촬영, 음악 제작, 비트
              메이킹, 프로듀싱 등을 함께하고 싶다면?
            </p>
            <p> We the Blast!</p>
          </div>
        </section>
        <section className="mt-6 md:mt-8">
          <div className="text-lg font-bold md:text-xl">
            주로 이런 활동을 해요
          </div>
          <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
            <li>매주 정기모임 및 활동</li>
            <li>창립제, 정기 공연, 클럽 공연, 학교 축제 공연 등 다양한 무대</li>
          </ul>
        </section>
        <section className="mt-6 md:mt-8">
          <div className="text-lg font-bold md:text-xl">
            이런 분과 함께하고 싶어요
          </div>
          <ul className="ml-5 mt-1 list-disc text-base font-medium text-gray-500 md:mt-1.5 md:text-lg">
            <li>흑인음악을 사랑하시는 분</li>
            <li>동아리 활동에 적극적으로 참여하실 분</li>
            <li>매주 정기모임에 참석이 가능하신 분</li>
          </ul>
        </section>
      </main>
      <BottomButton href={'/'}>지원하기</BottomButton>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
}) => {
  const { id } = context.query;
  return {
    props: {
      clubId: id,
    },
  };
};
