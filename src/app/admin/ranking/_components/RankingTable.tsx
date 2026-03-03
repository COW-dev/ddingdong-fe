import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Body1,
  Body2,
  Flex,
  Body3,
} from 'ddingdong-design-system';

import type { AdminFeedRankingApiResponse } from '@/app/_api/types/ranking';

type RankingTableProps = {
  data: AdminFeedRankingApiResponse[];
};

export function RankingTable({ data }: RankingTableProps) {
  if (data.length === 0) {
    return (
      <Flex justifyContent="center" className="w-full py-30">
        <Body2 as="span" className="text-gray-300">
          랭킹 데이터가 존재하지 않습니다
        </Body2>
      </Flex>
    );
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">
            <Body3 as="span" className="text-gray-400">
              순위
            </Body3>
          </TableHead>
          <TableHead className="py-6 text-center">
            <Body3 as="span" className="text-gray-400">
              동아리명
            </Body3>
          </TableHead>
          <TableHead className="hidden py-6 text-center md:table-cell">
            <Body3 as="span" className="text-gray-400">
              좋아요
            </Body3>
          </TableHead>
          <TableHead className="hidden py-6 text-center md:table-cell">
            <Body3 as="span" className="text-gray-400">
              댓글
            </Body3>
          </TableHead>
          <TableHead className="hidden py-6 text-center md:table-cell">
            <Body3 as="span" className="text-gray-400">
              조회수
            </Body3>
          </TableHead>
          <TableHead className="hidden py-6 text-center md:table-cell">
            <Body3 as="span" className="text-gray-400">
              게시물
            </Body3>
          </TableHead>
          <TableHead className="py-6 text-center">
            <Body3 as="span" className="text-gray-400">
              총점
            </Body3>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-100 font-medium">
        {data.map((item) => (
          <RankingTableRow key={item.clubName} item={item} />
        ))}
      </TableBody>
    </Table>
  );
}

function ScoreCell({ value }: { value: number }) {
  return (
    <TableCell className="text-center md:table-cell">
      <Body3 as="span" className="text-black">
        {value}{' '}
      </Body3>
      <Body3 as="span" className="text-gray-400">
        점
      </Body3>
    </TableCell>
  );
}

function RankingTableRow({ item }: { item: AdminFeedRankingApiResponse }) {
  return (
    <TableRow>
      <TableCell className="text-center">
        <Body1
          as="span"
          className="flex items-center justify-center gap-[0.4rem]"
        >
          <Body3
            as="span"
            weight="bold"
            className="flex h-[2.2rem] w-[2rem] items-center justify-center rounded-xl bg-blue-50 text-blue-500"
          >
            {item.rank}
          </Body3>
          <Body3 as="span" className="text-gray-400">
            위
          </Body3>
        </Body1>
      </TableCell>
      <TableCell className="py-6 text-center">
        <Body3 as="span" className="font-semibold text-black">
          {item.clubName}
        </Body3>
      </TableCell>
      <ScoreCell value={item.likeScore} />
      <ScoreCell value={item.commentScore} />
      <ScoreCell value={item.viewScore} />
      <ScoreCell value={item.feedScore} />
      <TableCell className="text-center">
        <Body3 as="span" className="font-semibold text-blue-500">
          {item.totalScore}{' '}
        </Body3>
        <Body3 as="span" className="text-gray-400">
          점
        </Body3>
      </TableCell>
    </TableRow>
  );
}
