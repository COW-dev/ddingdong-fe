import { useState } from 'react';
import Image from 'next/image';
import { QuestionType } from '@/types/form';
import ArrowDownGray from '../../assets/arrow_down_gray.svg';

interface DropdownProps {
  contents: QuestionType[];
  selected: QuestionType;
  setSelected: (value: QuestionType) => void;
  disabled?: boolean;
}

export default function Dropdown({
  contents,
  selected,
  setSelected,
  disabled = false,
}: DropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const convertToKorean = (value: QuestionType): string => {
    const translations: Record<QuestionType, string> = {
      CHECK_BOX: '체크박스',
      RADIO: '객관식',
      TEXT: '단답형',
      LONG_TEXT: '서술형',
      FILE: '파일',
    };
    return translations[value] || value;
  };

  return (
    <div className="relative w-full font-semibold text-gray-500 md:w-1/3">
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
        {convertToKorean(selected)}
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
              {convertToKorean(item)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
