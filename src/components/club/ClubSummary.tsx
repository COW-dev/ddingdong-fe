import Image from 'next/image';
import Admin from '@/assets/admin.jpg';

type ClubSummary = {
  name: string;
  category: string;
  tag: string;
  profileImageUrl: string;
};
export default function ClubSummary({
  name,
  category,
  tag,
  profileImageUrl,
}: ClubSummary) {
  return (
    <div className="flex items-center">
      <div className="h-14 w-14 overflow-hidden rounded-full border-[1.5px] border-gray-100 md:h-20 md:w-20">
        <Image
          src={profileImageUrl ?? Admin}
          width={80}
          height={80}
          priority
          alt="admin"
        />
      </div>
      <div className="ml-3">
        <h1 className="text-2xl font-bold md:text-4xl">{name}</h1>
        <div className="flex items-center md:mt-0.5">
          <div className={`rounded-lg text-base font-semibold md:text-lg`}>
            {category}
          </div>
          <div className="px-1.5 text-base font-medium text-gray-300 md:text-lg">
            |
          </div>
          <div className="rounded-lg text-base font-semibold text-gray-500 md:text-lg">
            {tag}
          </div>
        </div>
      </div>
    </div>
  );
}
