import Image from 'next/image';
import CherryFlower from '@/assets/cherryFlower.svg';
import Flower from '@/assets/flower.svg';
import { Stamp } from '@/types/event';

type Props = {
  collections: Stamp[];
};

export default function StampDetail({ collections }: Props) {
  return (
    <div className=" mt-2 flex w-full flex-row-reverse flex-wrap md:mt-5">
      {[...Array(10)].map((_, index) => {
        const collection = collections[index];
        return (
          <div key={index} className="flex w-1/2 flex-col items-center ">
            <Image
              key={index}
              src={collection?.stamp ? CherryFlower : Flower}
              width={25}
              height={25}
              alt={`벚꽃 도장 ${index + 1}`}
              className={`h-20 w-20
                ${index % 2 !== 0 && ' mb-4 mt-20'}`}
            />
            {collection && (
              <div
                key={index}
                className={`text-center ${index % 2 === 0 && 'mt-5'}`}
              >
                <span className=" font-bold text-pink-400">
                  {collection.stamp}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
