import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import CheckboxImg from '@/assets/checkbox.svg';
import CheckBox from '../../home/CheckBox';

interface Props {
  setOption: Dispatch<
    SetStateAction<{ category: string[]; recruit: string[]; sort: boolean }>
  >;
  option: { category: string[]; recruit: string[]; sort: boolean };
  filterOption: (
    item: string,
    option: string[],
    setOptionCallback: (updatedOption: string[]) => void,
  ) => void;
}

function RecruitStatus({ setOption, option, filterOption }: Props) {
  const { recruit } = option;
  const recruitList = ['모집 마감', '모집 중', '모집 예정'];

  function fillCheckBox() {
    if (recruit.length === 0) {
      return <Image src={CheckboxImg} width={18} height={18} alt="checkbox" />;
    }
    return <div className="h-4 w-4 rounded-sm border border-gray-400"></div>;
  }

  function handleClickOption(recruitType: string) {
    filterOption(recruitType, recruit, (updatedRecruit) => {
      setOption((prev) => ({
        ...prev,
        recruit: updatedRecruit,
      }));
    });
  }

  return (
    <>
      <div
        onClick={() => setOption((prev) => ({ ...prev, recruit: [] }))}
        key={`recruit-option_all`}
      >
        <label className="w-46 mx-1 flex items-center justify-center gap-2 rounded-md p-1 hover:bg-gray-100 ">
          {fillCheckBox()}
          <span className="w-[50%] py-1 ">전체 선택</span>
        </label>
      </div>
      {recruitList.map((recruitType) => (
        <div
          onClick={() => handleClickOption(recruitType)}
          key={`recruit-option_${recruitType}`}
        >
          <CheckBox title={recruitType} list={recruit} />
        </div>
      ))}
    </>
  );
}

export default RecruitStatus;
