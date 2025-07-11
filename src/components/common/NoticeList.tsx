import { useState } from 'react';
import Link from 'next/link';
import { useAllNotices } from '@/hooks/api/notice/useAllNotices';
import PagiNation from './PagiNation';

export default function NoticeList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data } = useAllNotices(currentPage);
  const notices = data?.data;
  const totalPages = data?.data?.totalPage || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <ul className="mt-14 w-full md:mt-16">
        {notices?.notices?.map((notice) => (
          <li key={notice.id} className="mb-1 w-full border-b">
            <Link
              href={`/notice/${notice.id}`}
              className="inline-block w-full pb-5 pt-3 transition-opacity hover:opacity-50 md:pt-3.5"
            >
              <div className="block text-base font-semibold sm:hidden">
                {notice.title && notice.title.length < 25
                  ? notice.title
                  : notice.title?.substring(0, 25) + '..'}
              </div>
              <div className="hidden text-xl font-semibold sm:block">
                {notice.title}
              </div>
              <div className="mb-2 mt-0.5 text-sm font-medium text-gray-400 md:text-base">
                {new Date(notice.createdAt).toLocaleDateString()}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <PagiNation
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
