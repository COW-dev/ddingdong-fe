import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import ArrowDown from '@/assets/arrowDown.svg';
import ArrowUp from '@/assets/arrowUp.svg';
import { ItemsType } from '@/constants/color';
import { NewBannerType } from '@/types/banner';
import { NewClub } from '@/types/club';

type SelectProps = {
  name: string;
  setData:
    | Dispatch<SetStateAction<NewBannerType>>
    | Dispatch<SetStateAction<NewClub>>;
  list: ItemsType[];
};

export default function Select({ name, setData, list }: SelectProps) {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<ItemsType>(list[0]);

  useEffect(() => {
    setShow(false);
  }, [value]);

  return (
    <div className="y-full relative w-full border-gray-100  bg-gray-50">
      <div className="inline-flex  w-full items-center overflow-hidden rounded-md  px-4 py-2 ">
        <div className={`w-full border-e text-sm/none text-${value.color}-500`}>
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
        className={`fixed z-10 mt-2 h-[25%] w-56 overflow-scroll rounded-md border border-gray-100 bg-white shadow-lg ${
          !show && `hidden`
        }`}
        role="menu"
      >
        <div className=" p-2">
          {list?.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <div
              key={`option-${index}`}
              className={`block rounded-lg px-4 py-2 text-sm hover:bg-gray-50  text-${item.color}-500`}
              onClick={(e) => {
                setValue(item);
                setData((prev) => ({
                  ...prev,
                  [name]: item.title,
                }));
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
