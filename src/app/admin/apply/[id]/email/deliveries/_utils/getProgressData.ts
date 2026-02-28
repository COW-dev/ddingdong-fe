import { EmailProgressAPIResponse } from '@/app/_api/types/email';

type ProgressData = {
  icon: 'error' | 'check' | 'loading';
  message: string;
  subMessage?: string;
};

export const getProgressData = (
  isCompleted: boolean,
  isDelayedThreshold: boolean,
  emailCounts: EmailProgressAPIResponse,
): ProgressData => {
  if (isCompleted) {
    if (emailCounts.failCount > 0) {
      return {
        icon: 'error',
        message: '이메일 전송이 일부 실패하였습니다.',
        subMessage: `일부 지원자에게 이메일이 정상적으로 전송되지 않았습니다.\n이메일 전송 현황에서 지원자 정보를 다시 확인해주세요.`,
      };
    }
    return {
      icon: 'check',
      message: '이메일 전송이 완료되었습니다.',
    };
  }

  if (isDelayedThreshold) {
    return {
      icon: 'loading',
      message: '이메일 전송이 지연되고 있습니다.',
      subMessage: `해당 페이지를 벗어나도 이메일 전송이 진행됩니다.\n이메일 전송 현황에서 진행 상황을 확인해주세요.`,
    };
  }

  return {
    icon: 'loading',
    message: '이메일 전송이 진행 중입니다.',
    subMessage: `해당 페이지를 벗어나도 이메일 전송이 진행됩니다.\n이메일 전송 현황에서 진행 상황을 확인해주세요.`,
  };
};
