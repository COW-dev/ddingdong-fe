import React from 'react';

interface SectionData {
  title: string;
  description: string;
  sections: string[];
}

interface SelectSectionProps {
  sectionData: SectionData;
}

export default function SelectSection({ sectionData }: SelectSectionProps) {
  return (
    <div>
      <div className="text-4xl font-bold text-gray-600">
        {sectionData.title}
      </div>
      <div className="py-2 text-lg font-semibold text-gray-400">
        {sectionData.description}
      </div>

      <div>
        {sectionData.sections.map((section) => (
          <div key={section}>{section}</div>
        ))}
      </div>

      <div className="flex gap-4">
        <button className="rounded bg-gray-300 px-4 py-2">취소</button>
        <button className="rounded bg-blue-500 px-4 py-2 text-white">
          다음
        </button>
      </div>
    </div>
  );
}
