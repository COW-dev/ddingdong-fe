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
    notice: NavBox;
  };
};

export const ROLE_TEXT: RoleText = {
  [ROLE_TYPE.ROLE_ADMIN]: {
    club: {
      title: '동아리 관리하기',
      subtitle: '동아리를 등록/삭제하거나, 동아리 점수를 입력해요.',
      route: '/club',
    },
    report: {
      title: '활동보고서 확인하기',
      subtitle: '동아리가 제출한 활동보고서를 확인해요.',
      route: '/report',
    },
    notice: {
      title: '공지사항 관리하기',
      route: '/notice',
    },
  },
  [ROLE_TYPE.ROLE_CLUB]: {
    club: {
      title: '동아리 정보수정하기',
      subtitle: '동아리 상세 정보를 입력/수정해요.',
      route: '/my-club',
    },
    report: {
      title: '활동보고서 관리하기',
      subtitle: '활동보고서를 작성하고, 제출한 보고서를 확인해요.',
      route: '/report',
    },
    notice: {
      title: '공지사항 확인하기',
      route: '/notice',
    },
  },
};
