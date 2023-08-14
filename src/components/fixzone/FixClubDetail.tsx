import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Data from '@/assets/image1.jpeg';
import NeutralButton from '@/components/common/NeutralButton';
import { useClubFixInfo } from '@/hooks/api/fixzone/useClubFixInfo';
import { FixClubDetailType } from '@/types/fixzone';
type Prop = {
  id: number;
};
const init = {
  id: 0,
  content: '',
  imageUrls: [''],
  isCompleted: false,
  title: '',
};

export default function FixClubDetail({ id }: Prop) {
  const [{ token }] = useCookies(['token']);
  const { data: response } = useClubFixInfo({ token, id });
  const [data, setData] = useState<FixClubDetailType>(init);
  useEffect(() => {
    if (response?.data) setData(response?.data);
  }, [response]);
  const { content, imageUrls, isCompleted, title } = data;

  return (
    <div className="max-w-[650px] p-5">
      <div className="mt-7 flex justify-between text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        <div className="mb-14">Fix:Zone 동아리방 시설보수</div>
      </div>
      <div className=" m-auto w-[550px] overflow-hidden rounded-lg bg-gray-100 bg-opacity-90 shadow-xl ">
        <div className="p-3 px-5">
          <div className="py-2 text-xl  font-semibold">{title}</div>
          <div>{content}</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Data}
            width={550}
            height={500}
            alt="fixImage"
            className=" overflow-hidden rounded-md"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end md:mt-8">
        <NeutralButton href="/fixzone">목록으로 돌아가기</NeutralButton>
      </div>
    </div>
  );
}
