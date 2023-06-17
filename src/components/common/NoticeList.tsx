import Link from 'next/link';
import { useAllNotices } from '@/hooks/useAllNotices';

export default function NoticeList() {
  const { isLoading, isError, data } = useAllNotices();

  if (isLoading) {
    <div>loading</div>;
  }
  if (isError) {
    <div>error</div>;
  }
  const notices = data?.data;

  return (
    <ul className="mt-14 w-full md:mt-16">
      {notices?.map((notice) => (
        <li key={notice.id} className="mb-1 w-full border-b">
          <Link
            href={`/notice/${notice.id}`}
            className="inline-block w-full pb-5 pt-3 transition-opacity hover:opacity-50 md:pt-3.5"
          >
            <div className="block text-base font-semibold sm:hidden">
              {notice.title.length < 25
                ? notice.title
                : notice.title.substring(0, 25) + '..'}
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
  );
}
