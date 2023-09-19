import Image from 'next/image';
import Place from '@/assets/place.svg';
type Prop = {
  place: string;
};
export default function Time({ place }: Prop) {
  return (
    <div className="flex h-10 flex-row items-center whitespace-nowrap rounded-xl border-[1.5px] border-gray-100 bg-gray-50 px-4 text-xl font-semibold md:mx-3 md:mt-0 md:text-base">
      <Image src={Place} alt="장소" width={25} height={25} />
      <span className="mx-2 pr-2 text-sm text-gray-400">{place}</span>
    </div>
  );
}
