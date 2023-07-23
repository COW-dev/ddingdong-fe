// type SelectProps = {
//   children: number[] | string[];
// };
export default function Select() {
  const items = [1, 2, 3];
  return (
    // <div>
    //   <label
    //     htmlFor="HeadlineAct"
    //     classNameName="block text-sm font-medium text-gray-900"
    //   />
    //   <select
    //     name="HeadlineAct"
    //     id="HeadlineAct"
    //     classNameName="mt-1.5 w-full rounded-lg border-gray-300 text-base text-gray-700 md:text-lg"
    //   >
    //     {children.map((item) => (
    //       <option key={item} value={item}>
    //         {item}
    //       </option>
    //     ))}
    //   </select>
    // </div>

    <div className="relative w-full">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <a
          href="#"
          className="w-full border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        >
          Edit
        </a>

        <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
        role="menu"
      >
        <div className="p-2">
          {items.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
              item
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
