import React from 'react';

export default function SelectSection({ sectionData }) {
  console.log(sectionData);
  return (
    <div>
      <div className="text-4xl font-bold text-gray-600">
        {sectionData.title}
      </div>
      <div className="py-2 text-lg font-semibold text-gray-400">
        {sectionData.description}
      </div>

      <div>{sectionData.sections}</div>
      <div>
        <button>취소</button>
        <button>다음</button>
      </div>
    </div>
  );
}
