type RoleType = {
  ROLE_ADMIN: string;
  ROLE_CLUB: string;
};
export const ROLE_TYPE: RoleType = {
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_CLUB: 'ROLE_CLUB',
};

type NavBox = {
  title: string;
  subtitle?: string;
  route: string;
};

type RoleText = {
  [K in RoleType[keyof RoleType]]: {
    club: NavBox;
    report: NavBox;
    member?: NavBox;
    score?: NavBox;
    fix: NavBox;
    notice: NavBox;
    documents: NavBox;
    faq?: NavBox;
    feed: NavBox;
    banner?: NavBox;
    apply?: NavBox;
  };
};

export const ROLE_TEXT: RoleText = {
  [ROLE_TYPE.ROLE_ADMIN]: {
    club: {
      title: '동아리 관리',
      subtitle: '동아리를 등록/삭제하거나, 동아리 점수를 입력해요.',
      route: '/club',
    },
    report: {
      title: '활동보고서 확인',
      subtitle: '동아리가 제출한 활동보고서를 확인해요.',
      route: '/report/admin',
    },
    fix: {
      title: '동아리 시설보수 확인',
      subtitle: '각 동아리방 시설보수 신청내역을 확인해요.',
      route: '/fix',
    },
    notice: {
      title: '공지사항 관리',
      route: '/notice',
    },
    documents: {
      title: '자료실 관리',
      subtitle: '동아리에게 필요한 자료를 등록/삭제해요.',
      route: '/documents',
    },
    faq: {
      title: 'FAQ 관리',
      subtitle: '총동아리연합회 및 동아리에게 자주 물어보는 질문을 관리해요.',
      route: '/faq',
    },
    feed: {
      title: '동아리 피드 업로드',
      subtitle: '동아리의 활동 사진 및 영상을 업로드하고 홍보해요.',
      route: '/feed',
    },
    banner: {
      title: '배너 관리',
      subtitle: '띵동의 모바일/웹 버전 배너를 관리해요',
      route: '/banner',
    },
  },
  [ROLE_TYPE.ROLE_CLUB]: {
    club: {
      title: '동아리 정보 수정',
      subtitle: '동아리 상세 정보를 입력/수정해요.',
      route: '/my-club',
    },
    member: {
      title: '동아리원 명단 관리',
      subtitle: '동아리원을 추가/수정해요.',
      route: '/member',
    },
    report: {
      title: '활동보고서 작성',
      subtitle: '활동보고서를 작성하고, 제출한 보고서를 확인해요.',
      route: '/report',
    },
    score: {
      title: '동아리 점수 확인',
      subtitle: '동아리의 활동 점수를 확인해요.',
      route: '/club/my/score',
    },
    fix: {
      title: '동아리 시설보수 신청',
      subtitle: '각 동아리방 시설보수 신청내역을 확인해요.',
      route: '/fix',
    },
    notice: {
      title: '공지사항',
      route: '/notice',
    },
    documents: {
      title: '자료실',
      route: '/documents',
    },
    feed: {
      title: '동아리 피드 업로드',
      subtitle: '동아리의 활동 사진 및 영상을 업로드하고 홍보해요.',
      route: '/feed',
    },
    apply: {
      title: '지원서 관리',
      subtitle: '지원서 양식을 생성하고, 제출된 지원서를 관리해요.',
      route: '/apply',
    },
  },
};

export type PositionType = {
  [key: string]: string;
};
export const Position: PositionType = {
  동아리원: 'MEMBER',
  임원: 'EXECUTIVE',
  회장: 'LEADER',
};
