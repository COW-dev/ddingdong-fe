import { Flex, Title3 } from 'ddingdong-design-system';

import type { ClubFeedRanking } from '@/app/_api/types/ranking';

type RankContainerProps = {
  clubRanking: ClubFeedRanking | null;
};

export function RankContainer({ clubRanking }: RankContainerProps) {
  if (!clubRanking) {
    return null;
  }

  const {
    rank,
    totalScore,
    likeScore,
    commentScore,
    viewScore,
    feedScore,
    lastMonthRank,
  } = clubRanking;

  const safeLastMonthRank =
    typeof lastMonthRank === 'number'
      ? `${lastMonthRank}위`
      : '지난달의 정보가 없습니다.';

  return (
    <Flex dir="col" gap={1} className="w-full">
      <Flex dir="col" gap={3} className="w-full rounded-xl bg-gray-50 p-6">
        <Flex alignItems="baseline" gap={2} className="w-full">
          <Title3 as="h2" weight="semibold" className="text-blue-500">
            이달의 피드 점수 현황
          </Title3>
          <span className="text-[1rem] text-gray-300">
            지난달 순위 : {safeLastMonthRank}
          </span>
        </Flex>

        <Flex
          as="div"
          wrap="wrap"
          gap={5}
          className="items-center text-[1rem] md:text-[1.2rem]"
        >
          <div className="flex items-center gap-[1rem] font-semibold">
            <span className="text-gray-400">총점</span>
            <span className="text-blue-500">
              {totalScore.toString().padStart(2, '0')}점
            </span>
          </div>

          <div className="flex items-center gap-[1rem] font-semibold">
            <span className="text-gray-400">순위</span>
            <span className="text-blue-500">{rank}위</span>
          </div>

          <span className="hidden text-gray-300 md:inline">|</span>

          <ScoreItem label="좋아요" value={likeScore} />
          <ScoreItem label="댓글" value={commentScore} />
          <ScoreItem label="조회수" value={viewScore} />
          <ScoreItem label="게시물" value={feedScore} />
        </Flex>
      </Flex>
      <span className="text-[0.8rem] text-gray-300">
        * 점수 산정 방식 : (좋아요 × 1) + (댓글 × 5) + (조회수 × 3) + (게시물 ×
        10)
      </span>
    </Flex>
  );
}

type ScoreItemProps = {
  label: string;
  value: number;
};

function ScoreItem({ label, value }: ScoreItemProps) {
  return (
    <div className="flex items-center gap-[0.8rem]">
      <span className="text-[1.1rem] font-semibold text-gray-400">{label}</span>
      <span className="text-[1.1rem] font-semibold text-gray-900">
        {value.toString().padStart(2, '0')}점
      </span>
    </div>
  );
}
