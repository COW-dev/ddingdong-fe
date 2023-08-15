import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Data from '@/assets/image1.jpeg';
import NeutralButton from '@/components/common/NeutralButton';
import { useAdminFixInfo } from '@/hooks/api/fixzone/useAdminFixInfo';
import { FixAdminDetailType } from '@/types/fixzone';
type Prop = {
  id: number;
};
const init = {
  id: 0,
  club: '',
  content: '',
  createdAt: '',
  imageUrls: [''],
  isCompleted: false,
  location: '',
  title: '',
};

export default function FixAdminDetail({ id }: Prop) {
  const [{ token }] = useCookies(['token']);
  const { data: response } = useAdminFixInfo({ token, id });
  const [data, setData] = useState<FixAdminDetailType>(init);
  useEffect(() => {
    if (response?.data) setData(response?.data);
  }, [response]);
  const { club, content, createdAt, imageUrls, isCompleted, location, title } =
    data;

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
        <div className="mt-7 border-t border-gray-200 p-3 text-end text-xs text-gray-500">
          <div>{club}</div>
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
        <div className="mt-7 border-gray-500 p-3 text-end text-xs text-gray-500">
          <div>제출일자 :{createdAt}</div>
          <div>동아리방 : {location}</div>
        </div>
      </div>
      <div className="mt-6 flex justify-end md:mt-8">
        <NeutralButton href="/fixzone">목록으로 돌아가기</NeutralButton>
      </div>
    </div>
  );
}
