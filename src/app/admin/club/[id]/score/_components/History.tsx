import {
  Body2,
  Caption1,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'ddingdong-design-system';

import { ScoreDetail, ScoreHistory } from '@/app/_api/types/score';

export function History({ totalScore, scoreHistories }: ScoreDetail) {
  return (
    <div>
      <Flex justifyContent="between" className="p-2">
        <Body2 weight="semibold">내역</Body2>
        <Body2 weight="bold" className="text-blue-500">
          총점 : {scoreHistories ? `${totalScore}점` : '0점'}
        </Body2>
      </Flex>
      <div className="h-56 overflow-scroll md:h-88">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>날짜</TableHead>
              <TableHead>카테고리</TableHead>
              <TableHead>점수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <HistoryContent history={scoreHistories} />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function HistoryContent({ history }: { history: ScoreHistory[] }) {
  if (!history)
    return (
      <TableRow>
        <td colSpan={3}>
          <Flex justifyContent="center" className="w-full py-4">
            <Caption1 weight="normal" className="text-gray-300">
              동아리 점수 내역이 존재하지 않습니다.
            </Caption1>
          </Flex>
        </td>
      </TableRow>
    );

  return [...history].reverse().map((item, index) => {
    const { createdAt, scoreCategory, amount } = item;
    return (
      <TableRow key={index}>
        <TableCell>
          <Caption1 weight="normal" className="max-xs:text-xs md:text-lg">
            {createdAt.split('T')[0]}
          </Caption1>
        </TableCell>
        <TableCell>{scoreCategory}</TableCell>
        <TableCell>{parseFloat(amount.toFixed(3))}점</TableCell>
      </TableRow>
    );
  });
}
