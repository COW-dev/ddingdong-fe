import { useCookies } from 'react-cookie';
import { useMyFix } from '@/hooks/api/fixzone/useMyFix';
import { sortFixZone } from '@/utils/change';
import FixItem from './FixItem';

export default function FixClubList() {
  const [{ token }] = useCookies(['token']);
  const { data } = useMyFix(token);
  const posts = data?.data ?? [];
  const sortedPosts = sortFixZone(posts);

  return (
    <div>
      <ul className="mt-10 h-[80vh] w-full overflow-y-scroll md:mt-14">
        {sortedPosts.map((fix, index) => (
          <div key={index}>
            <FixItem data={fix} />
          </div>
        ))}
        {posts.length === 0 && (
          <li className="mb-2 flex h-20 w-full flex-col items-center justify-center rounded-xl border border-gray-100 pl-4 pt-2 shadow-sm">
            <div className="text-sm text-gray-500">
              동아리방 시설보수 요청사항이 존재하지 않습니다.
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
