import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import New from '@/assets/new.svg';
import { useAdminAllReports } from '@/hooks/api/club/useAdminAllReports';
import { useCurrentReports } from '@/hooks/api/club/useCurrentReports';
type Props = {
  term: number;
  club: string;
  setTerm: Dispatch<SetStateAction<number>>;
};

export default function TermList({ term, club, setTerm }: Props) {
  const [{ token }] = useCookies(['token', 'role']);

  const currentTerm = useCurrentReports(token).data?.data.term ?? 1;
  const termList = Array.from({ length: 7 }, (_, i) => i + 1);
  const { data } = useAdminAllReports(token);

  const submitTerms = data?.data
    .filter((item) => item.name === club)
    .map((item) => item.term);

  return (
    <>
      <div className="no-scrollbar mt-4 h-[100%] overflow-y-scroll">
        {termList.map((item, index) => (
          <div
            className={`flex rounded-xl px-2 hover:bg-gray-100 ${
              (item > currentTerm || !submitTerms?.includes(item)) &&
              'text-gray-200 hover:bg-opacity-0'
            }`}
            key={`category-item-${index}`}
          >
            <div
              className={`mb-3  pt-3 `}
              key={item}
              onClick={() => {
                if (item > currentTerm)
                  return toast.error('해당 회차의 열람기간이 아닙니다.');
                setTerm(Number(item));
              }}
            >
              <div>
                {item}회차
                <span
                  className={`mx-2 mb-3 text-xs text-blue-500 ${
                    item !== Number(currentTerm) && 'hidden'
                  }`}
                >
                  NEW
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
