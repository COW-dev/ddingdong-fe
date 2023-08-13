import { useCookies } from 'react-cookie';
import { useMyFix } from '@/hooks/api/fixzone/useMyFix';
import FixItem from './FixItem';

export default function FixClubList() {
  const [{ token }] = useCookies(['token']);
  const { data } = useMyFix(token);

  return (
    <div>
      <ul className="mt-14 w-full md:mt-16">
        {data?.data.map((fix, index) => (
          <div key={`fix__club-${index}`}>
            <FixItem data={fix} />
          </div>
        ))}
      </ul>
    </div>
  );
}
