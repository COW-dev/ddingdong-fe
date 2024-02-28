import Link from 'next/link';
import { Applicant } from '@/types/event';

export default function EventCard({
  id,
  studentName,
  studentNumber,
  department,
}: Applicant) {
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
          <div className="font-medium text-pink-400 sm:text-base md:ml-1 md:text-base">
            <div>
              <span>{studentName}</span>
              <span className="ml-1">{studentNumber}</span>
            </div>
            <div className="flex items-center">
              <div className="rounded-lg text-gray-600">
                {department ? department : '알 수 없음'}
              </div>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}
