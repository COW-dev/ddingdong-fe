import Heading from '@/components/common/Heading';
import { DeptCaptionColorType } from '@/types/type';

const deptCaptionColor: DeptCaptionColorType = {
  봉사: 'text-pink-500',
  사회연구: 'text-orange-500',
  언행예술: 'text-yellow-500',
  전시창작: 'text-emerald-500',
  종교: 'text-cyan-500',
  체육: 'text-blue-500',
  학술: 'text-purple-500',
};

type ClubHeadingProps = {
  name: string;
  category: string;
  tag: string;
};

export default function ClubHeading({ name, category, tag }: ClubHeadingProps) {
  return (
    <>
      <div className="flex flex-col">
        <Heading>{name}</Heading>
        <div className="flex items-center">
          <div
            className={`rounded-lg text-lg font-semibold md:text-xl ${deptCaptionColor[category]}`}
          >
            {category}
          </div>
          <div className="px-1 text-lg font-medium text-gray-300 md:text-xl">
            |
          </div>
          <div className="rounded-lg text-lg font-semibold text-gray-500 md:text-xl">
            {tag}
          </div>
        </div>
      </div>
      <div className="mt-5 flex h-44 w-full flex-col justify-center rounded-xl border-[1.5px] border-gray-100 bg-[rgb(252,252,252)] p-5 text-base font-semibold md:mt-6 md:h-36 md:justify-center md:p-6 md:text-lg">
        <div className="flex w-full flex-col md:flex-row">
          <div className="mb-0.5 w-full md:w-88">
            <span className="inline-block w-20 text-gray-500">회장</span>
            <span>김보겸</span>
          </div>
          <div className="mb-0.5">
            <span className="inline-block w-20 text-gray-500">연락처</span>
            <span>010-0000-0000</span>
          </div>
        </div>
        <div className="flex w-full flex-col md:flex-row">
          <div className="mb-0.5 w-full md:w-88">
            <span className="inline-block w-20 text-gray-500">동아리방</span>
            <span>S4019</span>
          </div>
          <div className="mb-0.5">
            <span className="inline-block w-20 text-gray-500">정기모임</span>
            <span>매주 월요일</span>
          </div>
        </div>
        <div className="w-full">
          <span className="inline-block w-20 text-gray-500">모집기간</span>
          <span>4월 1일 ~ 4월 30일</span>
        </div>
      </div>
    </>
  );
}
