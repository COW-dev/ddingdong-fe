import { ROUND_RESULT_MODAL_CONTENT } from '../_constants/RoundResultModalContent';

export type RoundResultModalAction = 'nextStage' | 'quit' | 'retry' | 'submit';

type Result = { stage: number; success: boolean };

const TOTAL_HEARTS = 5;

function getHeartCounts(stage: number, success: boolean) {
  const filled = success ? stage : stage - 1;
  const broken = success ? 0 : 1;
  return {
    filledCount: filled,
    brokenCount: broken,
    emptyCount: TOTAL_HEARTS - filled - broken,
  };
}

function getActionConfig(stage: number, success: boolean) {
  const isLastStageSuccess = stage === TOTAL_HEARTS && success;

  if (isLastStageSuccess) {
    return { quitLabel: '나가기', rightLabel: '상품 응모하기', rightAction: 'submit' as const };
  }
  if (success) {
    return { quitLabel: '그만하기', rightLabel: '다음단계', rightAction: 'nextStage' as const };
  }
  return { quitLabel: '그만하기', rightLabel: '다시 도전하기', rightAction: 'retry' as const };
}

function getModalContent(stage: number, success: boolean) {
  const stageContent = ROUND_RESULT_MODAL_CONTENT[stage];
  if (!stageContent) return null;

  const { title, lines } = success ? stageContent.success : stageContent.fail;
  return { title, lines };
}

export function getRoundResultModalContent(result: Result) {
  const { stage, success } = result;

  return {
    content: getModalContent(stage, success),
    ...getHeartCounts(stage, success),
    ...getActionConfig(stage, success),
    stage,
    success,
  };
}
