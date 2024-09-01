import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  setOption: Dispatch<
    SetStateAction<{ category: string[]; recruit: string[]; sort: boolean }>
  >;
  option: { category: string[]; recruit: string[]; sort: boolean };
};

function Sort({ setOption, option }: Props) {
  function handleClickOption(isCategory: boolean) {
    setOption((prev) => ({ ...prev, sort: isCategory }));
  }

  return (
    <>
      <div
        onClick={() => handleClickOption(false)}
        className={`cursor-pointer rounded-xl p-2 px-5  ${
          option.sort ? `opacity-50` : `bg-gray-100 opacity-100`
        }`}
      >
        동아리명으로 정렬
      </div>
      <div
        onClick={() => handleClickOption(true)}
        className={`cursor-pointer rounded-xl p-2 px-5 ${
          option.sort ? `bg-gray-100 opacity-100` : `opacity-50`
        }`}
      >
        카테고리로 정렬
      </div>
    </>
  );
}

export default Sort;
