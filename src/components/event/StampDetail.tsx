import Image from 'next/image';
import CherryFlower from '@/assets/cherryFlower.svg';
import Flower from '@/assets/flower.svg';
import { Stamp } from '@/types/event';

type Props = {
  collections: Stamp[];
};

export default function StampDetail({ collections }: Props) {
  const defaltStamp = Flower;
  const reciveStamp = CherryFlower;

  return (
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
  );
}
