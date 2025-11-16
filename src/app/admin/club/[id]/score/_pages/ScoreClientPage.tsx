'use client';
import { ScoreQueryOptions } from '@/app/_api/queries/score';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Flex, Title1 } from 'ddingdong-design-system';
import History from '../_components/History';
import Category from '../_components/Category';
import { CATEGORY } from '../_consts/category';
import { CategoryListContainter } from '../_container/category';

export default function ScoreClientPage({ id }: { id?: string }) {
  const clubId = Number(id);
  const { data: score } = useSuspenseQuery(
    clubId ? ScoreQueryOptions.score(clubId) : ScoreQueryOptions.my(),
  );

  return (
    <>
      <Flex dir="col" className="gap-7 md:gap-10">
        <Title1 weight="bold" className="mt-7 md:mt-10">
          동아리 점수 {id ? '관리하기' : '확인하기'}
        </Title1>
        <History
          totalScore={score.totalScore}
          scoreHistories={score.scoreHistories}
        />
        <CategoryListContainter>
          {Object.entries(CATEGORY).map(([category], index) => (
            <Category
              key={index}
              category={category}
              score={score}
              clubId={clubId}
            />
          ))}
        </CategoryListContainter>
      </Flex>
    </>
  );
}
