import Image from 'next/image';
import Place from '@/assets/clubplace.svg';
import { ClubPlace } from '@/constants/event';
export default function BoothPlace() {
  let clubNumber = 1;
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
            <div
              key={index}
              className="h-58 ml-2 flex flex-col md:ml-28 md:w-4/5"
            >
              <h2 className="mt-6 text-xl font-bold text-pink-400 md:text-2xl">
                {item.place}
              </h2>
              <ul
                className={`grid-flow-cols grid grid-cols-3 ${
                  index !== 0 && 'grid-cols-3'
                } `}
              >
                {item.club.map((club, i) => (
                  <li
                    key={i}
                    className="my-0.5 ml-1 w-44 text-lg font-normal md:font-medium"
                  >
                    {clubNumber++}.
                    <span
                      className={` ${
                        club.length > 5 && 'text-[85%] md:text-lg'
                      }`}
                    >
                      {club}
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
