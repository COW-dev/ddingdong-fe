import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ScoreList from '@/components/score/ScoreList';
import { SCORE_TYPE } from '@/constants/score';
import { ROLE_TYPE } from '@/constants/text';
import { useNewScore } from '@/hooks/api/score/useNewScore';
import { ScoreHistory } from '@/types/score';

type Prop = {
  clubId: number;
  scoreCategory: string;
  history: ScoreHistory[];
  closeModal: () => void;
};

export default function CreateScore({
  clubId,
  scoreCategory,
  history,
  closeModal,
}: Prop) {
  const mutation = useNewScore();
  const [cookies] = useCookies(['token', 'role']);
  const { role } = cookies;
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');

  const getScoreValue = (categoryName: string) => {
    const scoreEntry = Object.values(SCORE_TYPE).find(
      (entry) => entry.category === categoryName,
    );
    return scoreEntry ? scoreEntry.value : ''; // Return the value if found, otherwise empty string
  };

  function handleClickChange() {
    mutation.mutate({
      scoreCategory: getScoreValue(scoreCategory),
      reason: reason,
      token: cookies.token,
      clubId: clubId,
      amount: amount,
    });
    closeModal();
  }

  useEffect(() => {
    setAmount(amount);
  }, [amount]);

  return (
    <div>
      {role === ROLE_TYPE.ROLE_ADMIN && (
        <form
          className={`mx-auto flex w-[90%] flex-col ${
            role === ROLE_TYPE.ROLE_CLUB && 'invisible'
          }`}
          onSubmit={handleClickChange}
        >
          <div className="mb-2 w-full">
            <label className="inline-block w-20 font-semibold text-gray-500">
              점수 입력
            </label>
            <div className="mt-4 flex space-x-2">
              <input
                name="reason"
                type="text"
                value={reason}
                placeholder="사유를 입력해주세요."
                className="w-2/3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
                onChange={(e) => setReason(e.target.value)}
              />
              <input
                name="score"
                type="number"
                value={amount}
                className="w-1/3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
          <button
            type="submit"
            className="my-5 w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-500 sm:py-4 sm:text-lg md:mt-3"
          >
            동아리 점수 입력하기
          </button>
        </form>
      )}
      <ScoreList history={history} />
    </div>
  );
}
