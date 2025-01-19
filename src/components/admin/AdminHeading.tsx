import { useCookies } from 'react-cookie';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useClubStore } from '@/store/club';

export default function AdminHeading() {
  const [{ token }] = useCookies(['token']);
  const { data } = useMyClub(token);
  const setClub = useClubStore((state) => state.setClub);

  if (data) {
    setClub(data.data);
  }

  return (
    <div className="flex w-full items-end justify-between">
      <div className="mt-7 text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        <div className="md:mr-1.5">안녕하세요,</div>
        <span className="text-blue-500">{data?.data.name}</span>
        <span className="ml-1 md:ml-1.5">님</span>
      </div>
    </div>
  );
}
