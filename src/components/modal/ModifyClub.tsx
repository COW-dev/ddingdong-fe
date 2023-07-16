import { useEffect, useState } from 'react';

type ModifyModalProp = {
  setShowModal: (flag: boolean) => void;
  score: number;
};

export default function ModifyClub({ score, setShowModal }: ModifyModalProp) {
  const [changedScore, setScore] = useState(score);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //post
    setShowModal(false);
    return;
  }

  useEffect(() => {
    setScore(score);
  }, [score]);

  return (
    <>
      <form className="m-auto flex w-[90%] flex-col" onSubmit={handleSubmit}>
        <div className="mb-3 w-full">
          <label className="inline-block w-20 font-semibold text-gray-500">
            점수
          </label>
          <input
            name="score"
            type="number"
            value={changedScore}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
            onChange={(e) => setScore(Number(e.target.value))}
          />
        </div>
        <button
          type="submit"
          className="mt-10 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:py-4 sm:text-lg md:mt-14"
        >
          동아리 정보 수정하기
        </button>
      </form>
      <button className="mx-[5%] w-[90%] rounded-xl bg-gray-100 py-4 font-bold text-gray-400 transition-colors hover:bg-red-600 hover:text-white sm:py-4 sm:text-lg ">
        동아리 삭제하기
      </button>
    </>
  );
}
