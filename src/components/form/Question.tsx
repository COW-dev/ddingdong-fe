import { useState } from 'react';
import BaseInput from './BaseInput';
import Content from './Content';
import Dropdown from './Dropdown';

export default function Question() {
  const options = ['객관식', '서술형', '단답형', '체크박스', '파일 업로드'];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="flex flex-col rounded-xl border border-gray-100 p-4">
      <div className="flex w-full flex-row gap-6">
        <BaseInput placeholder="질문을 입력해주세요" />
        <Dropdown
          contents={options}
          selected={selectedOption}
          setSelected={setSelectedOption}
        />
      </div>
      <div className="py-4">
        <Content option={selectedOption} isReadOnly={true} />
      </div>
    </div>
  );
}
