import { useEffect, useState } from 'react';
import Image from 'next/image';
import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';

type ItemsType = { title: string; color: string };

export default function useSelect() {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<ItemsType>({
    title: '봉사',
    color: 'text-pink-500',
  });

  //dummy
  const items: ItemsType[] = [
    { title: '봉사', color: 'text-pink-500' },
    { title: '사회연구', color: 'text-orange-500' },
    { title: '연행예술', color: 'text-yellow-500' },
    { title: '전시창작', color: 'text-emerald-500' },
    { title: '종교', color: 'text-cyan-500' },
    { title: '체육', color: 'text-blue-500' },
    { title: '학술', color: 'text-purple-500' },
  ];

  useEffect(() => {
    setShow(false);
  }, [value]);

  return (
    <div className="relative w-full">
      <div className="inline-flex items-center overflow-hidden rounded-md border ">
        <div
          className={`w-full border-e px-4 py-2 text-sm/none ${value.color}`}
        >
          {value.title}
        </div>
        <div
          className="h-full px-2  py-3  text-gray-600 opacity-80 hover:bg-gray-50 hover:opacity-100"
          onClick={() => setShow(!show)}
        >
          <Image
            src={show ? ArrowUp : ArrowDown}
            width={12}
            height={12}
            alt="arrow"
          />
        </div>
      </div>

      <div
        className={`absolute z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg ${
          !show && `hidden`
        }`}
        role="menu"
      >
        <div className="p-2">
          {items.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div
              className={`block rounded-lg px-4 py-2 text-sm hover:bg-gray-50 ${item.color}`}
              onClick={() => setValue(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
