import { useState } from 'react';
export default function Dropdown({ contents, selected, setSelected }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative w-48 font-semibold text-gray-500">
      <div
        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white px-4 py-2"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {selected}
      </div>
      {openDropdown && (
        <div className="absolute z-40 mt-1 w-full rounded-lg border border-gray-100 bg-white shadow-lg ">
          {contents.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
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
