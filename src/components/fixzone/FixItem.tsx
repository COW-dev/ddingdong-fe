import Image from 'next/image';
import Link from 'next/link';
import Check from '@/assets/check.svg';
import Progress from '@/assets/progress.svg';
import { Fix } from '@/types/fixzone';

export default function FixItem({ data }: { data: Fix }) {
  const { id, title, createdAt, isCompleted, club } = data;

  return (
    <li key={id} className="mb-2 flex w-full border border-gray-100 pl-4 pt-2">
      <Link
        href={`/fixzone/${id}`}
        className="inline-block w-full py-2 transition-opacity hover:opacity-50 md:pt-3.5"
      >
        <div className="block text-base font-semibold sm:hidden">
          {title && title.length < 15 ? title : title?.substring(0, 15) + '..'}
        </div>
        <div className="hidden text-lg font-semibold sm:block">{title}</div>
        <div className="mb-2 mt-0.5 text-sm font-medium text-gray-400 md:text-base">
          {new Date(createdAt).toLocaleDateString()} | {club}
        </div>
      </Link>
      <div
        className={`mx-1 mb-4 mt-2 flex w-30 flex-col items-center justify-center rounded-lg px-2 text-center text-xs font-semibold ${
          isCompleted ? ` text-green-500` : `  text-gray-500`
        }`}
      >
        <Image
          src={isCompleted ? Check : Progress}
          width={25}
          height={25}
          alt="isProcess"
          className="my-1"
        />
        {isCompleted ? `처리 완료` : `처리중`}
      </div>
    </li>
  );
}
