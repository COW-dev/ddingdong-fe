import Image from 'next/image';
import toast from 'react-hot-toast';
import New from '@/assets/new.svg';
import { dummy } from '../[id]/data';

export default function TermList({ club, setTerm }) {
  const currentTerm = 2;
  const termList = Array.from({ length: 7 }, (_, i) => `${i + 1}`);

  const submitTerms = dummy
    .filter((item) => item.name === club)
    .map((item) => item.term);

  const submitClubNames = ['띵동', 'COW'];
  return (
    <>
      <div className="no-scrollbar mt-4 h-[100%] overflow-y-scroll">
        {termList.map((item, index) => (
          <div
            className={`flex rounded-xl px-2 hover:bg-gray-100 ${
              (Number(item) > currentTerm || !submitTerms.includes(item)) &&
              'text-gray-200 hover:bg-opacity-0'
            }`}
            key={`category-item-${index}`}
          >
            <div
              className={`mb-3  pt-3 `}
              key={item}
              onClick={() => {
                if (Number(item) > currentTerm)
                  return toast.error('해당 회차의 열람기간이 아닙니다.');
                setTerm(Number(item));
              }}
            >
              <div> {item}회차</div>
            </div>
            <Image
              src={New}
              width={20}
              height={20}
              alt="bannerImg"
              className={`mx-2 mb-3 ${
                Number(item) !== currentTerm && 'hidden'
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
