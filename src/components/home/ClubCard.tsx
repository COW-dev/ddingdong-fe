import Link from 'next/link';
import { Body1 } from 'ddingdong-design-system';
import { deptCaptionColor } from '@/constants/color';

type ClubProps = {
  id: number;
  name: string;
  tag: string;
  category: string;
  recruitStatus: string;
};

export default function ClubCard({
  id,
  name,
  tag,
  category,
  recruitStatus,
}: ClubProps) {
  return (
    <li
      key={id}
      className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50"
    >
      <Link
        href={`/club/${id}`}
        className="flex h-full w-full justify-between p-5 md:p-6"
      >
        <div>
          <Body1 weight="bold">{name}</Body1>
          <div className="flex items-center">
            <div
              className={`rounded-lg text-sm font-semibold ${deptCaptionColor[category]}`}
            >
              {category}
            </div>
            <div className="px-1 text-sm font-medium text-gray-300">|</div>
            <div className="rounded-lg text-sm font-semibold text-gray-500">
              {tag}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div
            className={`rounded-lg px-2 py-1 text-sm font-semibold ${
              recruitStatus === '모집 중'
                ? 'bg-green-100 text-green-500'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {recruitStatus}
          </div>
        </div>
      </Link>
    </li>
  );
}
