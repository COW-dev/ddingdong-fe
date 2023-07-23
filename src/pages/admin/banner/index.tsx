import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import BottomArrouw from '@/assets/bottomArrow.svg';
import EditBanner from '@/components/banner/EditBanner';
import Heading from '@/components/common/Heading';
import { dummy } from './data';

export type BannerType = {
  id: number | boolean;
  color: string;
  title: string;
  subTitle: string;
  image: string;
};

const init: BannerType = {
  id: 0,
  color: '#c4b5fd',
  title: '',
  subTitle: '',
  image: '/hearts.png',
};

export default function Index() {
  const element = useRef<HTMLDivElement>(null);
  const [editNum, setEditNum] = useState<number | boolean>(false);
  const [value, setValue] = useState<BannerType>(init);

  // 배너 클릭 시 해당 배너 정보를 EditBanner로 전달
  const handleBannerClick = (data: BannerType) => {
    setEditNum(data.id);
  };

  // 취소 버튼 클릭 시 현재 선택된 배너 초기화
  const handleCancelClick = () => {
    setValue(init);
    setEditNum(false);
  };

  useEffect(() => {
    const temp = dummy.find((item) => item.id === editNum);
    if (temp) setValue(temp);
  }, [editNum]);

  const onMoveBox = () => {
    element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full">
      <Head>
        <title>띵동 어드민 - 배너관리</title>
      </Head>
      <div className="mb-14 flex flex-row items-end justify-between">
        <Heading>배너 관리하기</Heading>
      </div>

      <EditBanner value={value} setValue={setValue} />
      <div className="flex items-center justify-center">
        <Image
          src={BottomArrouw}
          width={50}
          height={50}
          alt="BottomArrouw"
          className="my-16 animate-bounce py-7"
          onClick={onMoveBox}
        />
      </div>

      <div ref={element} className="relative flex h-screen w-full flex-col ">
        <div className="my-18 text-center text-xl font-bold text-gray-500 md:text-4xl lg:my-24">
          작성한 배너 한 눈에 보기
        </div>
        {dummy.map((data) => (
          <div key={data.id} className="m-3">
            <div className="group relative">
              <div
                className={`editNum absolute right-0 inline-block w-12 p-2 font-semibold opacity-0 transition-opacity hover:font-bold ${
                  !editNum && `group-hover:opacity-70`
                }`}
              >
                {editNum !== data.id && (
                  <Image
                    src="/write.svg"
                    width={100}
                    height={100}
                    priority
                    alt="new"
                    className="w-5"
                    onClick={() => handleBannerClick(data)}
                  />
                )}
              </div>

              {/* 현재 선택된 배너에 대한 수정/삭제 버튼 */}
              {editNum === data.id && (
                <>
                  <div className="relative">
                    <div className="absolute end-0 right-2 z-10 mt-2 w-24 rounded-md border border-gray-100 bg-white shadow-lg">
                      <div className=" p-2">
                        <div className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                          수정
                        </div>
                        <div className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                          삭제
                        </div>
                        <div
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          onClick={handleCancelClick}
                        >
                          취소
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <EditBanner value={data} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
