import Image from 'next/image';
import Petal from '@/assets/petal.svg';
import { Stamp } from '@/types/event';
import DrawFooter from './DrawFooter';
import StampDetail from './StampDetail';
type ColletionProps = {
  completed: boolean;
  collections: Stamp[];
};

export default function StampBoard({ completed, collections }: ColletionProps) {
  const top = [
    70, 89, 72, 88, 90, 123, 134, 112, 125, 142, 151, 156, 168, 170, 189,
  ];
  const left = [32, 18, 71, 55, 82, 20, 64, 80, 50, 81, 25, 45, 70, 30, 55];

  const petalPositionsTop = [
    65, 89, 72, 98, 123, 134, 112, 142, 151, 168, 170, 189,
  ];
  const petalPositionsLeft = [2, 88, 51, 12, 2, 64, 43, 91, 2, 70, 30, 55];

  return (
    <>
      <div className="my-14 w-full text-center text-xl font-bold leading-tight md:mt-5 md:text-2xl">
        <div className="md:mr-1.5">동아리 부스체험하고</div>
        <span className="text-pink-400">10개의 벚꽃</span>
        <span className="md:ml-1.5">을 채워주세요!</span>
      </div>
      {petalPositionsTop.map((top, index) => (
        <Image
          key={index}
          src={Petal}
          alt="petal"
          style={{
            top: `${top}%`,
            left: `${petalPositionsLeft[index]}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          className={` absolute h-5 w-5 md:hidden ${
            index % 2 === 0 ? 'h-5 w-5 ' : ' h-3 w-3'
          }`}
        />
      ))}
      {top.map((top, index) => (
        <Image
          key={index}
          src={Petal}
          alt="petal"
          style={{
            top: `${top}%`,
            left: `${left[index]}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          className={` absolute hidden h-5 w-5 md:block ${
            index % 2 === 0 ? 'h-5 w-5 ' : ' h-3 w-3'
          }`}
        />
      ))}
      <StampDetail collections={collections} />
      <DrawFooter completed={completed} />
    </>
  );
}
