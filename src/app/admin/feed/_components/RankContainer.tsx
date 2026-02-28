import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Accordion,
  AccordionItem,
  Flex,
  Title3,
  Body1,
  Body2,
  Body3,
  Caption1,
} from 'ddingdong-design-system';

import { rankingQueryOptions } from '@/app/_api/queries/ranking';

import { getRankingDate } from '../../ranking/utils/getRankingDate';

export function RankContainer() {
  const { currentYear, currentMonth } = getRankingDate();
  const { data: clubRanking } = useSuspenseQuery(
    rankingQueryOptions.clubList(currentYear, currentMonth),
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
      <Flex dir="col" gap={1} className="md:hidden">
        <Accordion type="single">
          <AccordionItem
            value="rank-summary"
            trigger={
              <Flex dir="col" gap={1} className="w-full text-left">
                <Flex className="items-center gap-2">
                  <Body2 as="h2" className="text-blue-500">
                    이달의 피드 점수 현황
                  </Body2>
                  <Caption1 as="span" className="text-gray-300">
                    지난달 순위 : {safeLastMonthRank}
                  </Caption1>
                </Flex>
                <Flex gap={5} alignItems="center" className="mt-2">
                  <Flex gap={2}>
                    <Body3 as="span" className="text-gray-400">
                      총점
                    </Body3>
                    <Body3 as="span" className="text-blue-500">
                      {totalScore}점
                    </Body3>
                  </Flex>
                  <Flex className="items-center gap-[1rem]">
                    <Body3 as="span" className="text-gray-400">
                      순위
                    </Body3>
                    <Body3 as="span" className="text-blue-500">
                      {rank}위
                    </Body3>
                  </Flex>
                </Flex>
              </Flex>
            }
            btnClassName="rounded-t-xl bg-gray-50 p-6 pb-3"
            contentClassName="bg-gray-50 px-6 pb-3 pt-1"
          >
            <Flex dir="col" gap={3}>
              <hr className="border-gray-300" />
              <Flex wrap="wrap" gap={5}>
                <ScoreItem label="좋아요" value={likeScore} />
                <ScoreItem label="댓글" value={commentScore} />
                <ScoreItem label="조회수" value={viewScore} />
                <ScoreItem label="게시물" value={feedScore} />
              </Flex>
            </Flex>
          </AccordionItem>
        </Accordion>
        <Flex className="mt-2 ml-2">
          <Caption1 weight="semibold" className="text-gray-300">
            * 점수 산정 방식 : (좋아요 × 1) + (조회수 × 3) + (댓글 × 5) +
            (게시물 × 10)
          </Caption1>
        </Flex>
      </Flex>
      {/* pc 버전 */}
      <Flex className="hidden md:block">
        <Flex dir="col" gap={3}>
          <Flex dir="col" gap={2} className="w-full rounded-xl bg-gray-50 p-6">
            <Flex gap={2} className="w-full">
              <Body1 as="h2" weight="bold" className="text-blue-500">
                이달의 피드 점수 현황
              </Body1>
              <Body3 as="span" className="pt-1 text-gray-300">
                지난달 순위 : {safeLastMonthRank}
              </Body3>
            </Flex>

            <Flex wrap="wrap" gap={5} alignItems="center">
              <Flex gap={3}>
                <Body2 as="span" className="text-gray-400">
                  총점
                </Body2>
                <Body2 as="span" className="text-blue-500">
                  {totalScore}점
                </Body2>
              </Flex>

              <Flex gap={3}>
                <Body2 as="span" className="text-gray-400">
                  순위
                </Body2>
                <Body2 as="span" className="text-blue-500">
                  {rank}위
                </Body2>
              </Flex>

              <Body2 as="span" className="text-gray-300 md:inline">
                |
              </Body2>
              <ScoreItem label="좋아요" value={likeScore} />
              <ScoreItem label="댓글" value={commentScore} />
              <ScoreItem label="조회수" value={viewScore} />
              <ScoreItem label="게시물" value={feedScore} />
            </Flex>
          </Flex>
          <Body3 as="span" className="text-gray-300">
            * 점수 산정 방식 : (좋아요 × 1) + (조회수 × 3) + (댓글 × 5) +
            (게시물 × 10)
          </Body3>
        </Flex>
      </Flex>
    </Flex>
  );
}

type ScoreItemProps = {
  label: string;
  value: number;
};

function ScoreItem({ label, value }: ScoreItemProps) {
  return (
    <Flex alignItems="center" gap={3}>
      <Body2 as="span" className="text-gray-400">
        {label}
      </Body2>
      <Body2 as="span" className="text-gray-900">
        {value}점
      </Body2>
    </Flex>
  );
}
