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
    <>
      <div className=" mt-2 flex w-full flex-row-reverse flex-wrap md:mt-5 md:hidden">
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
      <div className="hidden md:block">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center justify-center">
            <div className="mb-10 flex">
              {[...Array(row === 1 ? 4 : 3)].map((_, column) => {
                const index =
                  row === 0 ? column : row === 1 ? 3 + column : 7 + column;
                const collection = collections[index];
                return (
                  <div key={index} className="mx-4 flex flex-col items-center">
                    <Image
                      src={collection?.stamp ? CherryFlower : Flower}
                      width={25}
                      height={25}
                      alt={`벚꽃 도장 ${index + 1}`}
                      className="mx-10 my-10 h-20 w-20"
                    />
                    {collection && (
                      <div className="mt-2 text-center md:mt-0">
                        <span className="font-bold text-pink-400">
                          {collection.stamp}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
