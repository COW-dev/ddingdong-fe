import Heading from '@/components/common/Heading';
import type { DeptCaptionColor } from '@/types';

const deptCaptionColor: DeptCaptionColor = {
  봉사: 'text-pink-500',
  사회연구: 'text-orange-500',
  연행예술: 'text-yellow-500',
  전시창작: 'text-emerald-500',
  종교: 'text-cyan-500',
  체육: 'text-blue-500',
  학술: 'text-purple-500',
};

type AdminClubHeadingProps = {
  clubName: string;
  category: string;
  tag: string;
};

export default function AdminClubHeading({
  clubName,
  category,
  tag,
}: AdminClubHeadingProps) {
  return (
    <>
      <div className="flex flex-col">
        <Heading>{clubName}</Heading>
        <div className="flex items-center md:mt-0.5">
          <div
            className={`rounded-lg text-base font-semibold md:text-lg ${deptCaptionColor[category]}`}
          >
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
    </>
  );
}
