import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from 'ddingdong-design-system';

import type { FeedRanking } from '@/app/_api/types/ranking';

type RankingTableProps = {
  data: FeedRanking[];
};

function ScoreCell({ value }: { value: number }) {
  return (
    <TableCell className="hidden py-[1.6rem] text-center text-[1.4rem] text-gray-600 md:table-cell">
      {value.toString().padStart(2, '0')}{' '}
      <span className="text-[1.2rem] text-gray-400">점</span>
    </TableCell>
  );
}

export default function RankingTable({ data }: RankingTableProps) {
  return (
    <Table className="w-full text-center">
      <TableHeader className="bg-[#F8F9FA] text-[1.2rem] md:text-[1.4rem]">
        <TableRow>
          <TableHead className="py-[1.6rem] text-center">순위</TableHead>
          <TableHead className="py-[1.6rem] text-center">동아리명</TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            피드
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            조회수
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            좋아요
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            댓글
          </TableHead>
          <TableHead className="py-[1.6rem] text-center">총점</TableHead>
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

function RankingTableRow({ item }: { item: FeedRanking }) {
  return (
    <TableRow>
      <TableCell className="py-[1.6rem] text-center text-[1.4rem]">
        <span className="flex items-center justify-center gap-[0.4rem]">
          <span className="flex h-[2.4rem] w-[2rem] items-center justify-center rounded-xl bg-[#EBF3FF] font-bold text-blue-500">
            {item.rank}
          </span>
          <span className="text-[1.2rem] text-gray-400">위</span>
        </span>
      </TableCell>
      <TableCell className="py-[1.6rem] text-center text-[1.4rem] font-bold text-gray-800">
        {item.clubName}
      </TableCell>
      <ScoreCell value={item.feedScore} />
      <ScoreCell value={item.viewScore} />
      <ScoreCell value={item.likeScore} />
      <ScoreCell value={item.commentScore} />
      <TableCell className="py-[1.6rem] text-center text-[1.4rem] font-bold text-blue-500">
        {item.totalScore.toString().padStart(2, '0')}{' '}
        <span className="text-[1.2rem] font-medium text-gray-400">점</span>
      </TableCell>
    </TableRow>
  );
}
