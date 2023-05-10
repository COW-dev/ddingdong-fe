import { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import TextareaAutosize from 'react-textarea-autosize';
import AdminClubHeading from '@/components/admin-club/AdminClubHeading';
import ClubInfoForm from '@/components/admin-club/ClubInfoForm';
import { ClubDetailType } from '@/types';

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

const dummy: ClubDetailType = {
  id: 33,
  clubName: '오버행',
  tag: '클라이밍',
  category: '체육',
  leaderName: '김보겸',
  phoneNumber: '010-0000-0000',
  location: 'S4019',
  regularMeeting: '매월 두 번째, 네 번째 수요일 오후 6시',
  recruitPeriod: '상시모집',
  formUrl: 'ww.www.com',
  isRecruit: true,
  introduction:
    '안녕하세요, 저희는 2022년에 창립된 명지대학교 인문캠퍼스 중앙 흑인음악 동아리 흑풍입니다.\n저희는 주로 힙합과 R&B 장르를 다루고 있습니다.\n다양한 무대와 사이퍼 제작, 뮤직비디오 촬영, 음악 제작, 비트 메이킹, 프로듀싱 등을 함께하고 싶다면?\nWe the Blast!',
  activities:
    '매주 정기모임 및 활동\n창립제, 정기 공연, 클럽 공연, 학교 축제 공연 등 다양한 무대',
  ideal:
    '흑인음악을 사랑하시는 분\n동아리 활동에 적극적으로 참여하실 분\n매주 정기모임에 참석이 가능하신 분',
};

export default function Index() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [clubData, setClubData] = useState<ClubDetailType>(dummy);
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setClubData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <>
      <Head>
        <title>{`띵동 어드민 - ${clubData.clubName}`}</title>
      </Head>
      <div className="flex items-end justify-between">
        <AdminClubHeading
          clubName={clubData.clubName}
          category={clubData.category}
          tag={clubData.tag}
        />
        {isEditing ? (
          <div className="-mr-2 mb-2 font-semibold">
            <button
              className="mr-1 rounded-xl px-2 py-2 text-gray-500 transition-colors hover:text-gray-600"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
            <button className="ml-1 rounded-xl px-2 py-2 text-blue-500 transition-colors hover:text-blue-600">
              확인
            </button>
          </div>
        ) : (
          <button
            className="mb-2 min-w-fit rounded-xl bg-blue-100 px-3.5 py-2 text-base font-bold text-blue-500 transition-colors hover:bg-blue-200 md:px-4 md:py-2.5"
            onClick={() => setIsEditing(true)}
          >
            정보 수정하기
          </button>
        )}
      </div>
      <form className="mt-6 md:mt-8">
        <ClubInfoForm
          leaderName={clubData.leaderName}
          phoneNumber={clubData.phoneNumber}
          location={clubData.location}
          regularMeeting={clubData.regularMeeting}
          recruitPeriod={clubData.recruitPeriod}
          formUrl={clubData.formUrl}
          setValue={setClubData}
          isEditing={isEditing}
        />
        <div className="mt-6 md:mt-8">
          <div className="text-lg font-bold md:text-xl">
            우리 동아리를 소개할게요
          </div>
          <TextareaAutosize
            name="introduction"
            minRows={4}
            value={clubData.introduction}
            disabled={!isEditing}
            onChange={handleChange}
            className={`${
              !isEditing && 'opacity-60'
            } mb-5 mt-2 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg`}
          />
          <div className="text-lg font-bold md:text-xl">이런 활동을 해요</div>
          <TextareaAutosize
            name="activities"
            minRows={2}
            value={clubData.activities}
            disabled={!isEditing}
            onChange={handleChange}
            className={`${
              !isEditing && 'opacity-60'
            } mb-5 mt-2 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg`}
          />
          <div className="text-lg font-bold md:text-xl">
            이런 분과 함께하고 싶어요
          </div>
          <TextareaAutosize
            name="ideal"
            minRows={2}
            value={clubData.ideal}
            disabled={!isEditing}
            onChange={handleChange}
            className={`${
              !isEditing && 'opacity-60'
            } mb-5 mt-2 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg`}
          />
        </div>
      </form>
    </>
  );
}
