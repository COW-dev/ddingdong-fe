import { Score, ScoreDetail } from '@/types/score';
type Prop = {
  scoreData: ScoreDetail[];
};

export default function History({ scoreData }: Prop) {
  return (
    <>
      <div className="m-auto mt-5 p-5">
        <div className=" mb-2 flex flex-row justify-between ">
          <span className="ml-2 text-lg font-semibold lg:text-xl">내역</span>
          <span className="text-lg font-bold text-purple-500 md:text-2xl">
            총점 : {scoreData[scoreData?.length - 1].remainingScore}점
          </span>
        </div>
        <div
          className={` ${
            scoreData.length > 5 ? 'h-56 overflow-scroll md:h-88 ' : ''
          } shadow-md sm:rounded-lg`}
        >
          <table className="text-md w-full  text-left text-gray-500 md:text-lg">
            <thead className="text-md bg-gray-50 text-gray-700 md:text-lg">
              <tr>
                <th scope="col" className="px-3 md:px-6 md:py-3 ">
                  날짜
                </th>
                <th scope="col" className="px-2 py-3 md:px-6 md:py-3">
                  카테고리
                </th>
                <th scope="col" className=" md:px-5 md:py-3">
                  점수
                </th>
              </tr>
            </thead>
            <tbody>
              {[...scoreData].reverse().map((data, index) => (
                <tr key={index} className=" border-b bg-white">
                  <td className="px-3 py-2 md:px-6 md:py-4">
                    {data.createdAt.split('T')[0]}
                  </td>
                  <td className="px-3 md:px-6 md:py-4">
                    {data?.scoreCategory}
                  </td>
                  <td className="px-3 py-2 md:px-6 md:py-4">
                    {data?.amount}점
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
