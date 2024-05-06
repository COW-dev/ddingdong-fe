import { useCookies } from 'react-cookie';
import { useAllFix } from '@/hooks/api/fixzone/useAllFix';
import FixItem from './FixItem';

export default function FixAdminList() {
  const [{ token }] = useCookies(['token']);
  const { data } = useAllFix(token);
  const posts = data?.data ?? [];
  return (
    <div>
      <ul className="mt-10 w-full md:mt-14">
        {[...posts].reverse().map((fix, index) => (
          <div key={`fix__admin-${index}`}>
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
