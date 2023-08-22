import { useCookies } from 'react-cookie';
import { useAllFix } from '@/hooks/api/fixzone/useAllFix';
import FixItem from './FixItem';

export default function FixAdminList() {
  const [{ token }] = useCookies(['token']);
  const { data } = useAllFix(token);

  return (
    <div>
      <ul className="mt-14 w-full md:mt-16">
        {data?.data.map((fix, index) => (
          <div key={`fix__admin-${index}`}>
            <FixItem data={fix} />
          </div>
        ))}
      </ul>
    </div>
  );
}
