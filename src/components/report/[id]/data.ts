import Image1 from '@/assets/image1.jpeg';
import Image2 from '@/assets/image2.jpeg';

import { ReportDetail } from '@/types/report';

export const dummy: any[] = [
  {
    id: 1,
    createdAt: '2023.06.23.07:20',
    name: 'COW',
    leader: '김세빈',
    leaderDepartment: '융합소프트웨어학부',
    content: '엠티 회의',
    place: 'S1353',
    startDate: '2023-07-06',
    endDate: new Date('2023-07-06'),
    startTime: '14:30',
    endTime: '16:30',
    imageUrls: Image1,
    participants: [
      {
        name: '김세빈',
        studentId: 60211904,
        department: '융합소프트웨어학부',
      },
      {
        name: '김보겸',
        studentId: 60211614,
        department: '융합소프트웨어학부',
      },
      {
        name: '모유경',
        studentId: 60201034,
        department: '융합소프트웨어학부',
      },
      {
        name: '유원준',
        studentId: 60201664,
        department: '융합소프트웨어학부',
      },
      {
        name: '박수환',
        studentId: 60202904,
        department: '융합소프트웨어학부',
      },
    ],
  },
  {
    reportId: 2,
    createdAt: '2023.06.30.07:20',
    name: 'COW',
    leader: '김세빈',
    leaderDepartment: '융합소프트웨어학부',
    content: '정기 모임',
    place: 'S1350',
    startDate: new Date(),
    endDate: new Date(),
    startTime: '14:30',
    endTime: '16:30',
    imageUrls: Image2,
    participants: [
      {
        studentName: '김세빈',
        studentId: 60211904,
        studentMajor: '융합소프트웨어학부',
      },
      {
        studentName: '김보겸',
        studentId: 60211614,
        studentMajor: '융합소프트웨어학부',
      },
      {
        studentName: '모유경',
        studentId: 60201034,
        studentMajor: '융합소프트웨어학부',
      },
      {
        studentName: '유원준',
        studentId: 60201664,
        studentMajor: '융합소프트웨어학부',
      },
      {
        studentName: '박수환',
        studentId: 60202904,
        studentMajor: '융합소프트웨어학부',
      },
    ],
  },
];
