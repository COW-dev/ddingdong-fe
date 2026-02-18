import { ROUND_RESULT_MODAL_CONTENT } from '../_utils/RoundResultModalContent';

export type RoundResultModalAction = 'nextStage' | 'quit' | 'retry' | 'submit';

type Result = { stage: number; success: boolean };

export const useRoundResultModal = (result: Result) => {
  const { stage, success } = result;
  const content = ROUND_RESULT_MODAL_CONTENT[stage] ?? null;

  const filledCount = success ? stage : stage - 1;
  const brokenCount = success ? 0 : 1;
  const emptyCount = 5 - filledCount - brokenCount;

  const isStage5Success = stage === 5 && success;
  const quitLabel = isStage5Success ? '나가기' : '그만하기';

  let rightLabel: string;
  let rightAction: RoundResultModalAction;
  if (isStage5Success) {
    rightLabel = '상품 응모하기';
    rightAction = 'submit';
  } else if (success) {
    rightLabel = '다음단계';
    rightAction = 'nextStage';
  } else {
    rightLabel = '다시 도전하기';
    rightAction = 'retry';
  }

  const title = content
    ? success
      ? content.success.title
      : content.fail.title
    : null;
  const lines = content
    ? success
      ? content.success.lines
      : content.fail.lines
    : [];

  return {
    content: title ? { title, lines } : null,
    filledCount,
    brokenCount,
    emptyCount,
    quitLabel,
    rightLabel,
    rightAction,
    stage,
    success,
  };
};
