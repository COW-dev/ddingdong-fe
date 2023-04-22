import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

type SearchBarProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="mb-5 mt-6 flex w-full items-center justify-center md:mb-3 md:mt-8">
      <div className="flex w-full rounded-xl border-[1.5px] border-gray-100 bg-[rgb(251,251,251)] p-3 md:w-128">
        <input
          type="text"
          value={value}
          spellCheck={false}
          onChange={handleChange}
          className="w-full bg-[rgb(252,252,252)] pl-1 pr-2 text-sm font-semibold outline-none md:text-base"
        />
        <Image
          src="/search.svg"
          width={50}
          height={50}
          priority
          alt="search"
          className="w-5 md:w-6"
        />
      </div>
    </div>
  );
}
