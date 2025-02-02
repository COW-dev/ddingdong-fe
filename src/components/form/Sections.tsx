import { InfoIcon } from 'lucide-react';

export default function Sections({
  names = ['공통질문'],
  onClickAdd,
  focusNumber,
  setFocusSection,
}) {
  return (
    <div className="flex items-center gap-1 border-b-0 px-4 font-semibold ">
      <div
        className={`cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-100 px-3 py-1 ${
          focusNumber === 0
            ? 'bg-blue-50 text-blue-500'
            : 'bg-white text-gray-500 hover:bg-gray-50'
        }`}
        onClick={() => setFocusSection(0)}
      >
        공통질문
      </div>

      {names.map((name, index) => (
        <div
          key={index}
          className={`cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-100 px-3 py-1 ${
            focusNumber === index + 1
              ? 'bg-blue-50 text-blue-500'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => setFocusSection(index + 1)}
        >
          {name}
        </div>
      ))}

      <div
        onClick={onClickAdd}
        className="cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-100 bg-white px-3 py-1 font-semibold text-gray-500 hover:bg-gray-50"
      >
        + 추가하기
      </div>
      <InfoIcon className="mx-1 w-5 cursor-pointer text-gray-500" />
    </div>
  );
}
