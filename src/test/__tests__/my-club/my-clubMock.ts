import { ClubDetail } from '@/app/_api/types/club';

export const myClubMock: ClubDetail = {
  name: '테스트 동아리',
  tag: '배드민턴',
  category: '체육',
  leader: '김주장',
  phoneNumber: '010-1234-5678',
  location: 's1234',
  regularMeeting: '2025.08.21~2025.09.04',
  introduction: '동아리 소개',
  activity: '동아리 활동',
  ideal: '성실한 사람',
  profileImage: {
    originUrl: 'https://example.com/profile.jpg',
    cdnUrl: 'https://cdn.example.com/profile.jpg',
  },
  introductionImage: {
    originUrl: 'https://example.com/intro.jpg',
    cdnUrl: 'https://cdn.example.com/intro.jpg',
  },
};
