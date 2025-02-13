import { useState } from 'react';
import Image from 'next/image';
import ArrowDownGray from '../../assets/arrow_down_gray.svg';

type Props = {
  contents: { [key: string]: string[] };
  disabled?: boolean;
  label?: string;
};

export function StepDropdown({ label, contents, disabled = false }: Props) {
  const allItems = Object.entries(contents).flatMap(([category, items]) =>
    items.map((item) => ({ category, item })),
  );

  const [selectedContent, setSelectedContent] = useState(
    allItems[0]?.item || '',
  );
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="h-fix flex w-full flex-col">
      {!disabled && (
        <label className="mb-3 px-1 font-bold text-blue-500">학과</label>
      )}
      <div
        className={`relative w-full items-center rounded-xl border border-gray-200 py-1.5 text-start align-middle text-base font-semibold text-gray-500 md:text-lg
        ${disabled ? '' : 'cursor-pointer bg-white hover:bg-gray-50'}
      `}
      >
        <div
          className="flex h-full flex-row items-center justify-between px-5 py-1 text-base hover:rounded-lg "
          onClick={() => !disabled && setOpenDropdown(!openDropdown)}
        >
          {disabled ? '학과를 선택해 주세요' : selectedContent}
          <Image
            src={ArrowDownGray}
            alt="arrow_down"
            className={`transform transition-transform duration-300 ${
              openDropdown ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>

        {openDropdown && !disabled && (
          <div className="absolute left-0 top-full z-10 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {Object.entries(contents).map(
              ([category, items], categoryIndex) => (
                <div key={categoryIndex} className="flex flex-col">
                  <div className="cursor-default border-b border-gray-200 px-5 py-4 font-semibold text-gray-300">
                    {category}
                  </div>

                  {items.map((item, key) => (
                    <div
                      key={key}
                      className="cursor-pointer px-5 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedContent(item);
                        setOpenDropdown(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
