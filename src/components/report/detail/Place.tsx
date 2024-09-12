import Image from 'next/image';
import PlaceImage from '@/assets/place.svg';

type PlaceProp = {
  place: string;
};

export default function Place({ place }: PlaceProp) {
  return (
    <div className="flex h-10 flex-row items-center whitespace-nowrap rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 text-xl font-semibold md:mx-3 md:mt-0 md:text-base">
      <Image src={PlaceImage} alt="장소" width={25} height={25} />
      <span className="mx-2 pr-2 text-sm text-gray-400">
        {place === '' ? '장소없음' : place}
      </span>
    </div>
  );
}
