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

export default function RankingTable({ data }: RankingTableProps) {
  if (data.length === 0) {
    return (
      <div className="py-[3.2rem] text-center text-[1.6rem] text-gray-400">
        랭킹 데이터가 없습니다
      </div>
    );
  }

  return (
    <Table className="w-full text-center">
      <TableHeader className="bg-[#F8F9FA] text-[1.2rem] md:text-[1.4rem]">
        <TableRow>
          <TableHead className="py-[1.6rem] text-center">
            <span className="text-gray-400">순위</span>
          </TableHead>
          <TableHead className="py-[1.6rem] text-center">
            <span className="text-gray-400">동아리명</span>
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            <span className="text-gray-400">피드</span>
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            <span className="text-gray-400">조회수</span>
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            <span className="text-gray-400">좋아요</span>
          </TableHead>
          <TableHead className="hidden py-[1.6rem] text-center md:table-cell">
            <span className="text-gray-400">댓글</span>
          </TableHead>
          <TableHead className="py-[1.6rem] text-center">
            <span className="text-gray-400">총점</span>
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
    <TableCell className="hidden py-[1.6rem] text-center text-[1.4rem] font-semibold text-black md:table-cell">
      <span className="font-semibold text-black">
        {value.toString().padStart(2, '0')}{' '}
      </span>
      <span className="text-[1.2rem] text-gray-400">점</span>
    </TableCell>
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
      <TableCell className="py-[1.6rem] text-center text-[1.4rem] font-bold">
        <span className="font-semibold text-black">{item.clubName}</span>
      </TableCell>
      <ScoreCell value={item.feedScore} />
      <ScoreCell value={item.viewScore} />
      <ScoreCell value={item.likeScore} />
      <ScoreCell value={item.commentScore} />
      <TableCell className="py-[1.6rem] text-center text-[1.4rem] font-bold text-blue-500">
        <span className="font-semibold text-blue-500">
          {item.totalScore.toString().padStart(2, '0')}{' '}
        </span>
        <span className="text-[1.2rem] text-gray-400">점</span>
      </TableCell>
    </TableRow>
  );
}
