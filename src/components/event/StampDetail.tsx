import Image from 'next/image';
import CherryFlower from '@/assets/cherryFlower.svg';
import Flower from '@/assets/flower.svg';
import { Stamp } from '@/types/event';

type Props = {
  collections: Stamp[];
};

export default function StampDetail({ collections }: Props) {
  console.log(collections);
  return (
    <div className="align-items-center mt-2 grid grid-cols-2 justify-items-center md:mt-10 md:grid-cols-5 ">
      {[...Array(10)].map((_, index) => {
        const collection = collections[index];
        return (
          <div key={index}>
            <Image
              key={index}
              src={collection?.stamp ? CherryFlower : Flower}
              width={25}
              height={25}
              alt={`벚꽃 도장 ${index + 1}`}
              className={
                index % 2 === 0
                  ? 'mb-5 mt-14 h-20 w-20 md:mb-20 md:mt-0'
                  : 'h-20 w-20'
              }
            />
            {collection && (
              <div
                key={index}
                className={index % 2 === 0 ? 'text-center' : ' m-5'}
              >
                <span>{collection.stamp}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
