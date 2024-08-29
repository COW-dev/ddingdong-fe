import { useState } from 'react';

interface DropdownProps {
  head: React.ReactNode;
  list: React.ReactNode[];
}

export default function Dropdown({ head, list }: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="rotate-90"
        type="button"
        onClick={handleClick}
      >
        {head}
      </button>
      {open && (
        <div
          id="dropdownHover"
          className="relative z-20 m-auto min-w-fit divide-y divide-gray-100 rounded-lg shadow "
        >
          <ul
            className="absolute -right-18 z-10 w-44 rounded-xl border-[1px] bg-white py-2 text-sm text-gray-700 shadow-lg"
            aria-labelledby="dropdownHoverButton"
          >
            {list.map((item, index) => (
              <li
                key={index}
                className="block cursor-pointer px-4 py-2 font-semibold hover:bg-gray-100"
                onClick={handleClick}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
