import Link from 'next/link';
import type { DeptCaptionColor } from '@/types';

type ClubProps = {
  id: number;
  name: string;
  tag: string;
  category: string;
  isRecruit: boolean;
};

const deptCaptionColor: DeptCaptionColor = {
  봉사: 'text-pink-500',
  사회연구: 'text-orange-500',
  연행예술: 'text-yellow-500',
  전시창작: 'text-emerald-500',
  종교: 'text-cyan-500',
  체육: 'text-blue-500',
  학술: 'text-purple-500',
};

export default function ClubCard({
  id,
  name,
  tag,
  category,
  isRecruit,
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
          <div className="text-lg font-bold md:text-xl">{name}</div>
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
              isRecruit
                ? 'bg-green-100 text-green-500'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {isRecruit ? '모집 중' : '모집 마감'}
          </div>
        </div>
      </Link>
    </li>
  );
}
