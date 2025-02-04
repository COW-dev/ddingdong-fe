import { useState } from 'react';
import Image from 'next/image';
import ArrowDown from '../../assets/arrowDown.svg';
type Props = {
  contents: { [key: string]: string[] };
  disabled?: boolean;
};

export function StepDropdown({ contents, disabled = false }: Props) {
  const allItems = Object.entries(contents).flatMap(([category, items]) =>
    items.map((item) => ({ category, item })),
  );

  const [selectedContent, setSelectedContent] = useState(
    allItems[0]?.item || '',
  );
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div
      className={`relative w-full items-center rounded-lg border border-gray-200 text-start align-middle text-base font-semibold text-gray-400 md:text-lg
        ${disabled ? '' : 'cursor-pointer bg-white '}
      `}
    >
      <div
        className="flex h-full flex-row items-center justify-between px-4 py-3 hover:rounded-lg md:py-1 "
        onClick={() => !disabled && setOpenDropdown(!openDropdown)}
      >
        {selectedContent ? '학과를 선택해 주세요' : selectedContent}
        <Image src={ArrowDown} alt="arrow_down" />
      </div>

      {openDropdown && !disabled && (
        <div className="absolute left-0 top-full z-10 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {Object.entries(contents).map(([category, items], categoryIndex) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
