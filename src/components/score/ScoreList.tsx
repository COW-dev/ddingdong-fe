import { ScoreHistory } from '@/types/score';

type Props = {
  history: ScoreHistory[];
};

export default function ScoreList({ history }: Props) {
  return (
    <div className=" m-auto w-[90%]">
      <label className={`w-20 font-semibold text-gray-500`}>
        {history.length > 0 ? '상세 내역' : '상세 내역이 존재하지 않습니다.'}
      </label>
      <div className="my-2 text-gray-600">
        {history.map((data, index) => (
          <div
            key={index}
            className=" flex h-10 items-center justify-between space-x-4 border-b"
          >
            <div>{data.createdAt.split(' ')[0]}</div>
            <div>{data.reason}</div>
            <div>{data.amount.toFixed(3)}점</div>
          </div>
        ))}
      </div>
    </div>
  );
}
