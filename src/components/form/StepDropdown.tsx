import { useState } from 'react';

type Props = {
  contents: { [key: string]: string[] };
};

export function StepDropdown({ contents }: Props) {
  const allItems = Object.entries(contents).flatMap(([category, items]) =>
    items.map((item) => ({ category, item })),
  );

  const [selectedContent, setSelectedContent] = useState(
    allItems[0]?.item || '',
  );
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative w-56 cursor-pointer items-center rounded-lg border border-gray-200 bg-white text-start align-middle text-base font-semibold text-gray-400 md:w-128 md:text-lg">
      <div
        className="flex h-full flex-row items-center justify-between pl-5 hover:rounded-lg md:py-3"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {selectedContent}
      </div>

      {openDropdown && (
        <div className="absolute left-0 top-full z-10 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg md:w-64">
          {Object.entries(contents).map(([category, items], categoryIndex) => (
            <div key={categoryIndex} className="flex flex-col">
              <div className="cursor-default border-gray-200 px-5 py-2 font-semibold text-gray-300">
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
