import { useEffect, useState } from 'react';
import Image from 'next/image';
import Checkbox from '@/assets/checkbox.svg';
type Props = {
  title: string;
  list?: string[];
};
export default function CheckBox({ title, list }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(
    list?.includes(title) ?? false,
  );

  useEffect(() => {
    if (list?.length === 0) setIsChecked(false);
  }, [list?.length]);
  return (
    <label
      onClick={() => setIsChecked(!isChecked)}
      className="w-46 mx-1 flex items-center justify-center gap-2 rounded-md p-1 hover:bg-gray-100 "
    >
      {isChecked ? (
        <Image src={Checkbox} width={18} height={18} alt="checkbox" />
      ) : (
        <div className="h-4 w-4 rounded-sm border border-gray-400"></div>
      )}
      <span className="w-[50%] py-1 ">{title}</span>
    </label>
  );
}
