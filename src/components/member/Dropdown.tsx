import { useState, useEffect } from 'react';
import Image from 'next/image';
import ArrowDownGray from '../../assets/arrow_down_gray.svg';

interface DropdownProps<T> {
  contents: T[];
  selected: T | undefined;
  setSelected: (value: T) => void;
  disabled?: boolean;
  labelConverter?: (value: T) => string;
}

export default function Dropdown<T extends string | number>({
  contents,
  selected,
  setSelected,
  disabled = false,
  labelConverter,
}: DropdownProps<T>) {
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (contents.length > 0 && selected === undefined) {
      setSelected(contents[0]);
    }
  }, [contents, selected, setSelected]);

  const defaultConverter = (value: T) => String(value);
  const convert = labelConverter ?? defaultConverter;

  return (
    <div className="relative w-full font-semibold text-gray-500">
      <div
        className={`flex items-center justify-between rounded-xl border px-4 py-3
        ${
          disabled
            ? ' '
            : 'cursor-pointer border-gray-200 bg-white text-gray-500'
        }`}
        onClick={() => {
          if (!disabled) {
            setOpenDropdown(!openDropdown);
          }
        }}
      >
        {selected ? convert(selected) : '선택하세요'}
        <Image
          src={ArrowDownGray}
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
              {convert(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
