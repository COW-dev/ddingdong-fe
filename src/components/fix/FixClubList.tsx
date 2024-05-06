import { useCookies } from 'react-cookie';
import { useMyFix } from '@/hooks/api/fixzone/useMyFix';
import FixItem from './FixItem';

export default function FixClubList() {
  const [{ token }] = useCookies(['token']);
  const { data } = useMyFix(token);
  const posts = data?.data ?? [];

  return (
    <div>
      <ul className="mt-10 h-[80vh] w-full overflow-y-scroll md:mt-14">
        {[...posts].reverse().map((fix, index) => (
          <div key={`fix__club-${index}`}>
            <FixItem data={fix} />
          </div>
        ))}
        {posts.length === 0 && (
          <li className="mb-2 flex h-20 w-full flex-col items-center justify-center rounded-xl border border-gray-100 pl-4 pt-2 shadow-sm">
            <div className=" text-sm text-gray-500 ">
              픽스존 요청사항이 존재하지 않습니다.
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
