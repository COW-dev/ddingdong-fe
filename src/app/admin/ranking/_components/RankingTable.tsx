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
} from 'ddingdong-design-system';

import type { AdminFeedRankingApiRequest } from '@/app/_api/types/ranking';

type RankingTableProps = {
  data: AdminFeedRankingApiRequest[];
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
      <TableHeader className="bg-[#F8F9FA]">
        <TableRow>
          <TableHead className="py-[1.6rem] text-center">
            <Body1 as="span" className="text-gray-400">
              순위
            </Body1>
          </TableHead>
          <TableHead className="py-[1.6rem] text-center">
            <Body1 as="span" className="text-gray-400">
              동아리명
            </Body1>
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            <Body1 as="span" className="text-gray-400">
              좋아요
            </Body1>
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            <Body1 as="span" className="text-gray-400">
              댓글
            </Body1>
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            <Body1 as="span" className="text-gray-400">
              조회수
            </Body1>
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            <Body1 as="span" className="text-gray-400">
              게시물
            </Body1>
          </TableHead>
          <TableHead className="py-[1.6rem] text-center">
            <Body1 as="span" className="text-gray-400">
              총점
            </Body1>
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
    <TableCell className="hidden py-[1.6rem] text-center md:table-cell">
      <Body1 as="span" className="text-black">
        {value}{' '}
      </Body1>
      <Body1 as="span" className="text-gray-400">
        점
      </Body1>
    </TableCell>
  );
}

function RankingTableRow({ item }: { item: AdminFeedRankingApiRequest }) {
  return (
    <TableRow>
      <TableCell className="py-[1.6rem] text-center">
        <Body1
          as="span"
          className="flex items-center justify-center gap-[0.4rem]"
        >
          <Body1
            as="span"
            className="flex h-[2.4rem] w-[2rem] items-center justify-center rounded-xl bg-[#EBF3FF] font-bold text-blue-500"
          >
            {item.rank}
          </Body1>
          <Body1 as="span" className="text-gray-400">
            위
          </Body1>
        </Body1>
      </TableCell>
      <TableCell className="py-[1.6rem] text-center">
        <Body1 as="span" className="font-semibold text-black">
          {item.clubName}
        </Body1>
      </TableCell>
      <ScoreCell value={item.likeScore} />
      <ScoreCell value={item.commentScore} />
      <ScoreCell value={item.viewScore} />
      <ScoreCell value={item.feedScore} />
      <TableCell className="py-[1.6rem] text-center">
        <Body1 as="span" className="font-semibold text-blue-500">
          {item.totalScore}{' '}
        </Body1>
        <Body1 as="span" className="text-gray-400">
          점
        </Body1>
      </TableCell>
    </TableRow>
  );
}
