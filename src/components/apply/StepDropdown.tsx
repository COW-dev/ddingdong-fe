import { useState, useEffect } from 'react';
import Image from 'next/image';
import ArrowDownGray from '../../assets/arrow_down_gray.svg';

type Props = {
  contents: { [key: string]: string[] };
  disabled?: boolean;
  label?: string;
  selectItem: (item: string) => void;
  selectedContent: string;
};

export function StepDropdown({
  label,
  contents,
  selectItem,
  disabled = false,
  selectedContent,
}: Props) {
  const allItems = Object.entries(contents).flatMap(([category, items]) =>
    items.map((item) => ({ category, item })),
  );

  useEffect(() => {
    if (!selectedContent && allItems.length > 0) {
      selectItem(allItems[0].item);
    }
  }, [selectedContent, allItems, selectItem]);

  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="h-fix flex w-full flex-col text-lg ">
      {!disabled && (
        <label className="mb-3 px-1 text-lg font-bold text-blue-500 md:text-xl">
          학과
        </label>
      )}
      <div
        className={`relative w-full items-center rounded-xl border border-gray-200 py-1.5 text-start align-middle font-semibold text-gray-500 
        ${disabled ? '' : 'cursor-pointer bg-white hover:bg-gray-50'}
      `}
      >
        <div
          className="flex h-full flex-row items-center justify-between px-4 py-1 hover:rounded-lg "
          onClick={() => !disabled && setOpenDropdown(!openDropdown)}
        >
          {disabled ? '학과를 선택해 주세요.' : selectedContent}
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
                  <div className="cursor-default border-b border-gray-200 px-5 py-3 font-semibold text-gray-300">
                    {category}
                  </div>

                  {items.map((item, key) => (
                    <div
                      key={key}
                      className="cursor-pointer px-5 py-3 hover:bg-gray-100"
                      onClick={() => {
                        selectItem(item);
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
