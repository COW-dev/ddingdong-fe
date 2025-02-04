import { useState } from 'react';
import Image from 'next/image';
import ArrowDown from '../../assets/arrowDown.svg';

export default function Dropdown({
  contents,
  selected,
  setSelected,
  disabled,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative w-full font-semibold text-gray-500 md:w-1/3">
      <div
        className={`flex items-center justify-between rounded-lg border px-4 py-3
    ${
      disabled
        ? 'border-gray-300 bg-gray-100 text-gray-400'
        : 'cursor-pointer border-gray-200 bg-white text-gray-700'
    }
  `}
        onClick={() => {
          if (!disabled) {
            setOpenDropdown(!openDropdown);
          }
        }}
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
