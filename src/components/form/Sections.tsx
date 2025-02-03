import { InfoIcon } from 'lucide-react';

export default function Sections({
  addSection,
  focusSection,
  setFocusSection,
  sections,
}) {
  return (
    <div className="flex items-center gap-1 border-b-0 px-4 font-semibold ">
      {sections.map((name: string, index: number) => (
        <div
          key={index + 1}
          className={`cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-200 px-3 py-1 ${
            focusSection === sections[index]
              ? 'bg-blue-50 text-blue-500'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => setFocusSection(sections[index])}
        >
          {name}
        </div>
      ))}

      <div
        onClick={addSection}
        className="cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-200 bg-white px-3 py-1 font-semibold text-gray-500 hover:bg-gray-50"
      >
        + 추가하기
      </div>
      <InfoIcon className="mx-1 w-5 cursor-pointer text-gray-500" />
    </div>
  );
}
