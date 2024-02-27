import Image from 'next/image';
import Place from '@/assets/clubplace.svg';
import { ClubPlace, Type } from '@/constants/event';
export default function BoothPlace() {
  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src={Place}
          width={400}
          height={100}
          alt="ClubPlace"
          className="mt-2 md:w-3/4 "
        />
        {ClubPlace.map((item, index) => {
          return (
            <div key={index} className="h-58 flex flex-col md:w-2/3">
              <h2 className="mt-3 text-xl font-bold text-pink-400">
                {item.place}
              </h2>
              <ul
                className={`grid-flow-cols grid grid-cols-3 ${
                  index !== 0 && 'grid-cols-3'
                } `}
              >
                {item.club.map((club, i) => (
                  <li key={i} className=" my-0.5 ml-1 w-40 text-start">
                    <span>
                      {i + 1}. {club}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
