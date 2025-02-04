import { useState } from 'react';
import Image from 'next/image';
import ArrowDown from '../../assets/arrowDown.svg';

export default function Dropdown({ contents, selected, setSelected }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative w-full font-semibold text-gray-500 md:w-1/3">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {selected}
        <Image
          src={ArrowDown}
          alt="arrow"
          className={`transition-transform duration-300 ${
            openDropdown ? 'rotate-180' : ''
          }`}
        />
      </div>

      {openDropdown && (
        <div className="absolute z-40 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {contents.map((item, index) => (
            <div
              key={index}
              className={`cursor-pointer px-4 py-3 transition hover:bg-gray-100 ${
                index === 0 ? 'hover:rounded-t-lg' : ''
              } ${index === contents.length - 1 ? 'hover:rounded-b-lg' : ''}`}
              onClick={() => {
                setSelected(item);
                setOpenDropdown(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
