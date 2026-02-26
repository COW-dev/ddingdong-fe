import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, Title3, Body1, Body3 } from 'ddingdong-design-system';

import { rankingQueryOptions } from '@/app/_api/queries/ranking';

import { getRankingDate } from '../../ranking/_hooks/getRankingDate';

export function RankContainer() {
  const { currentYear, currentMonth } = getRankingDate();
  const { data: clubRanking } = useSuspenseQuery(
    rankingQueryOptions.clubFeedRanking(currentYear, currentMonth),
  );

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
      : '지난달의 정보가 없습니다';

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
          <Flex className="flex items-center gap-[1rem] font-semibold">
            <Body1 as="span" className="text-gray-400">
              총점
            </Body1>
            <Body1 as="span" className="text-blue-500">
              {totalScore.toString().padStart(2, '0')}점
            </Body1>
          </Flex>

          <Flex className="flex items-center gap-[1rem] font-semibold">
            <Body1 as="span" className="text-gray-400">
              순위
            </Body1>
            <Body1 as="span" className="text-blue-500">
              {rank}위
            </Body1>
          </Flex>

          <Body1 as="span" className="hidden text-gray-300 md:inline">
            |
          </Body1>

          <ScoreItem label="좋아요" value={likeScore} />
          <ScoreItem label="댓글" value={commentScore} />
          <ScoreItem label="조회수" value={viewScore} />
          <ScoreItem label="게시물" value={feedScore} />
        </Flex>
      </Flex>
      <Body3 as="span" className="text-gray-300">
        * 점수 산정 방식 : (좋아요 × 1) + (댓글 × 5) + (조회수 × 3) + (게시물 ×
        10)
      </Body3>
    </Flex>
  );
}

type ScoreItemProps = {
  label: string;
  value: number;
};

function ScoreItem({ label, value }: ScoreItemProps) {
  return (
    <Flex className="flex items-center gap-[0.8rem]">
      <Body1 as="span" className="text-[1.1rem] font-semibold text-gray-400">
        {label}
      </Body1>
      <Body1 as="span" className="text-[1.1rem] font-semibold text-gray-900">
        {value.toString().padStart(2, '0')}점
      </Body1>
    </Flex>
  );
}
