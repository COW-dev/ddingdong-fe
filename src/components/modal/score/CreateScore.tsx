import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ScoreList from '@/components/common/ScoreList';
import { ROLE_TYPE } from '@/constants/text';
import { useNewScore } from '@/hooks/api/score/useNewScore';
import { ModalType } from '@/types';
import { ScoreDetail } from '@/types/score';

type Prop = {
  clubId: number;
  scoreCategory: string;
  parseList: ScoreDetail[];
  closeModal: () => void;
};

export default function CreateScore({
  clubId,
  scoreCategory,
  parseList,
  closeModal,
}: Prop) {
  const mutation = useNewScore();
  const [cookies] = useCookies(['token', 'role']);
  const { role } = cookies;
  const [amount, setAmount] = useState(0);
  const [reason, setReason] = useState('');

  function handleClickChange() {
    mutation.mutate({
      scoreCategory: scoreCategory,
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
    <>
      {role === ROLE_TYPE.ROLE_ADMIN && (
        <form
          className={`mx-auto flex w-[90%] flex-col ${
            role === ROLE_TYPE.ROLE_CLUB && 'invisible'
          }`}
          onSubmit={handleClickChange}
        >
          <div className="mb-3 w-full">
            <label className="inline-block w-20 font-semibold text-gray-500">
              점수 입력
            </label>
            <div className="flex space-x-2">
              <input
                name="reason"
                type="text"
                value={reason}
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
            className="mt-8 w-full rounded-xl bg-purple-400 py-4 font-bold text-white transition-colors hover:bg-purple-500 sm:py-4 sm:text-lg md:mt-5"
          >
            동아리 점수 입력하기
          </button>
        </form>
      )}
      <ScoreList parseList={parseList} />
    </>
  );
}
