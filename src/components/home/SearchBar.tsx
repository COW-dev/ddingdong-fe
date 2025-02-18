import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Search from '@/assets/search.svg';

type SearchBarProps = {
  type?: 'home' | 'apply';
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({
  type = 'home',
  value,
  onChange,
}: SearchBarProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div
      className={` ${
        type === 'home' && 'mb-5 mt-6 md:mb-3 md:mt-8'
      } flex w-full items-center justify-center`}
    >
      <div
        className={`${
          type === 'home' ? 'mt-6 p-3 md:mb-3' : 'p-2'
        }  flex w-full rounded-xl border-[1.5px] border-gray-100 bg-gray-50 md:w-128`}
      >
        <input
          type="text"
          value={value}
          spellCheck={false}
          onChange={handleChange}
          className="w-full bg-inherit pl-1 pr-2 text-base font-semibold outline-none md:text-lg"
        />
        <Image
          src={Search}
          width={50}
          height={50}
          alt="search"
          className="w-5 cursor-pointer md:w-6"
        />
      </div>
    </div>
  );
}
