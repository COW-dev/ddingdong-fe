import { useState } from 'react';

interface DropdownProps {
  head: React.ReactNode;
  list: React.ReactNode[];
}

export default function Dropdown({ head, list }: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="md:text-md inline-flex min-w-fit items-center rounded-lg bg-green-100 px-5 py-2.5 text-center text-sm font-bold text-green-500 hover:bg-green-200 focus:outline-none "
        type="button"
        onClick={handleOpen}
      >
        {head}
      </button>
      {open && (
        <div
          id="dropdownHover"
          className="relative z-20 m-auto min-w-fit divide-y divide-gray-100 rounded-lg bg-green-200 shadow "
        >
          <ul
            className="absolute -right-18 z-10 mt-10 w-44 rounded-xl border-[1px] bg-white py-2 text-sm text-gray-700 shadow-lg"
            aria-labelledby="dropdownHoverButton"
          >
            {list.map((item, index) => (
              <li
                key={index}
                className="block cursor-pointer px-4 py-2 font-semibold hover:bg-gray-100"
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
