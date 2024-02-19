import Image from 'next/image';
import CherryFlower from '@/assets/cherryFlower.svg';
import Flower from '@/assets/flower.svg';
import Npay from '@/assets/npay.svg';
import { Stamp } from '@/types/event';
import DrawMessage from './DrawMessge';
type ColletionProps = {
  completed: boolean;
  collections: Stamp[];
};

export default function StampBoard({ completed, collections }: ColletionProps) {
  const defaltStamp = Flower;
  const reciveStamp = CherryFlower;
  return (
    <>
      <div className="my-7 w-full text-center text-xl font-bold leading-tight md:mt-10 md:text-3xl">
        <div className="md:mr-1.5">동아리 부스체험하고</div>
        <span className="text-pink-400">10개의 벚꽃</span>
        <span className="md:ml-1.5">을 채워주세요!</span>
      </div>
      <div className="align-items-center mt-2 grid grid-cols-2 justify-items-center md:mt-10 md:grid-cols-5 ">
        {[...Array(10)].map((_, index) => {
          const collection = collections[index];
          const stamp = collection ? reciveStamp : defaltStamp;
          return (
            <div key={index}>
              <Image
                key={index}
                src={stamp}
                width={25}
                height={25}
                alt={`벚꽃 도장 ${index + 1}`}
                className={
                  index % 2 === 0
                    ? 'mb-10 mt-14 h-20 w-20 md:mb-20 md:mt-0'
                    : 'h-20 w-20'
                }
              />
              {collection && (
                <div key={index}>
                  <span>{collection.stamp}</span>
                  <span>{collection.collectedAt}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex flex-col items-center text-xl md:flex-row md:justify-between">
        <div className="mt-4 flex flex-row items-center justify-center">
          <Image src={Npay} width={130} height={100} alt={'네이버페이'} />
          <div className="ml-2 flex flex-col text-[85%] font-bold">
            <span className="font-semibold text-pink-400">추첨경품</span>
            <span className="">네이버페이</span>
            <span className="">1만원(100명)</span>
          </div>
        </div>
        <DrawMessage completed={completed} />
        <button
          className={`mt-2 h-10 w-22 rounded-lg text-sm font-semibold transition-colors md:mt-4 md:h-12 md:w-48 md:text-lg ${
            completed
              ? ' bg-pink-400 text-white '
              : 'cursor-not-allowed bg-gray-50 text-gray-500 hover:bg-gray-100'
          }`}
        >
          응모하기
        </button>
      </div>
    </>
  );
}
