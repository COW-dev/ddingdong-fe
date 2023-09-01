import { ScoreDetail } from '@/types/score';

type Props = {
  parseList: ScoreDetail[];
};

export default function ScoreList({ parseList }: Props) {
  return (
    <div className=" m-auto w-[90%]">
      <label className={`w-20 font-semibold text-gray-500`}>
        {parseList.length > 0 ? '상세 내역' : '상세 내역이 존재하지 않습니다.'}
      </label>
      <div className="my-2 text-gray-600">
        {parseList.map((data, index) => (
          <div
            key={index}
            className=" flex h-10 items-center justify-between space-x-4 border-b"
          >
            <div>{data.createdAt.split('T')[0]}</div>
            <div>{data.reason}</div>
            <div>{data.amount}점</div>
          </div>
        ))}
      </div>
    </div>
  );
}
