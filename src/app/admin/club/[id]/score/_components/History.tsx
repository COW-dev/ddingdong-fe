import { ScoreDetail, ScoreHistory } from '@/app/_api/types/score';
import { Body2, Body3, Caption1, Flex } from 'ddingdong-design-system';

export default function History({ totalScore, scoreHistories }: ScoreDetail) {
  return (
    <div>
      <Flex justifyContent="between" className="p-2">
        <Body2 weight="semibold">내역</Body2>
        <Body2 weight="bold" className="text-blue-500">
          총점 : {scoreHistories ? `${totalScore}점` : '0점'}
        </Body2>
      </Flex>
      <div
        className={`rounded-lg shadow-sm ${
          scoreHistories && 'h-56 overflow-scroll md:h-88'
        }`}
      >
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              <th className="p-3 md:p-6 md:py-3">
                <Body3>날짜</Body3>
              </th>
              <th className="p-3 md:p-6 md:py-3">
                <Body3>카테고리</Body3>
              </th>
              <th className="p-3 md:p-6 md:py-3">
                <Body3>점수</Body3>
              </th>
            </tr>
          </thead>
          <tbody>
            <HistoryContent history={scoreHistories} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function HistoryContent({ history }: { history: ScoreHistory[] }) {
  if (!history)
    return (
      <tr className="h-40 md:h-72">
        <td colSpan={3}>
          <Flex justifyContent="center" className="w-full py-4">
            <Caption1 weight="normal" className="text-gray-300">
              동아리 점수 내역이 존재하지 않습니다.
            </Caption1>
          </Flex>
        </td>
      </tr>
    );

  return [...history].reverse().map((item, index) => {
    const { createdAt, scoreCategory, amount } = item;
    return (
      <tr key={index} className="border-b border-neutral-200">
        <td className="p-3 md:p-6 md:py-3">
          <Body3 weight="normal">{createdAt.split('T')[0]}</Body3>
        </td>
        <td className="p-3 md:p-6 md:py-3">
          <Body3 weight="normal">{scoreCategory}</Body3>
        </td>
        <td className="p-3 md:p-6 md:py-3">
          <Body3 weight="normal">{parseFloat(amount.toFixed(3))}점</Body3>
        </td>
      </tr>
    );
  });
}
