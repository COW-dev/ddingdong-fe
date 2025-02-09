import { useState } from 'react';
import { InfoIcon } from 'lucide-react';

type Props = {
  addSection: () => void;
  focusSection: string;
  setFocusSection: (section: string) => void;
  sections: string[];
  isClosed: boolean;
};

export default function Sections({
  addSection,
  focusSection,
  setFocusSection,
  sections,
  isClosed,
}: Props) {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div className="relative flex items-center gap-1 border-b-0 px-4 font-semibold">
      {sections?.map((name: string, index: number) => (
        <div
          key={index}
          className={`cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-200 px-3 py-1 ${
            focusSection === name
              ? 'bg-blue-50 text-blue-500'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
          onClick={() => setFocusSection(name)}
        >
          {name}
        </div>
      ))}

      {sections.length < 5 && !isClosed && (
        <div
          onClick={addSection}
          className="cursor-pointer whitespace-nowrap rounded-md rounded-b-none border border-b-0 border-gray-200 bg-white px-3 py-1 font-semibold text-gray-500 hover:bg-gray-50"
        >
          + 추가하기
        </div>
      )}

      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <InfoIcon className="mx-1 w-5 cursor-pointer text-gray-500" />
        {showTooltip && (
          <div className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 rounded-lg bg-blue-50 p-3 text-sm font-normal shadow-md">
            <p>분야별 질문이 다를 경우,</p>
            <p>시트를 추가하여 구분할 수 있습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
