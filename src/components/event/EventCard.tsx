import Link from 'next/link';
import { Applicant } from '@/types/event';

export default function EventCard({ id, name, major, sId }: Applicant) {
  return (
    <>
      <li
        key={id}
        className="rounded-xl border-[1.5px] border-gray-100 bg-white transition-colors hover:border-gray-200 hover:bg-gray-50"
      >
        <Link
          href={`/event/${id}`}
          className="flex h-full w-full justify-between p-3 md:p-3"
        >
          <div className="ml-1 text-lg font-medium text-pink-400 md:text-lg">
            <div>
              <span>{name}</span>
              <span className="ml-1">{sId}</span>
            </div>
            <div className="flex items-center">
              <div className="rounded-lg font-normal text-gray-600">
                {major}
              </div>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}
