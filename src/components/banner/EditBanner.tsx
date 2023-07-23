import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import ImageInput from '@/assets/imageInput.svg';
import { BannerType } from '@/pages/admin/banner';

export type BannerProps = {
  value: BannerType;
  setValue?: Dispatch<SetStateAction<BannerType>>;
};

export default function Banner({ value, setValue }: BannerProps): JSX.Element {
  const { id, color, title, subTitle, image } = value;
  const divStyle = {
    backgroundColor: color,
  };
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue &&
      setValue((prev: BannerType) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
  }

  return (
    <div
      className={`bg-hex flex h-56 w-full flex-col items-center justify-center rounded-xl md:h-48 md:flex-row`}
      style={divStyle}
    >
      <div className=" md:min-w-[35%]">
        <div
          className={`flex h-28 w-28 flex-col items-center justify-center  drop-shadow-sm md:ml-auto md:h-40 md:w-40 ${
            !id && `border`
          }`}
        >
          <label htmlFor="image">
            <Image
              src={id ? image : ImageInput}
              width={id ? 1000 : 50}
              height={id ? 1000 : 50}
              alt="bannerImg"
              className="h-40 w-50 object-scale-down drop-shadow-sm"
            />
            <input
              id="image"
              type="file"
              disabled={!id}
              name="image"
              accept="image/*"
              className="hidden "
            />
          </label>
        </div>
      </div>
      <div className="mx-4 mb-4 w-full text-center md:mb-0 md:ml-[5%]  md:text-left">
        <p className="my-0.5 w-full text-2xl font-bold md:text-4xl">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => handleChange(e)}
            placeholder="이곳에 제목을 입력해주세요"
            className={` w-full content-center text-center  text-white placeholder-white outline-none md:text-left `}
            style={divStyle}
          />
        </p>
        <p className="w-full px-10 text-base font-semibold leading-tight text-gray-600 md:px-0 md:text-xl">
          <input
            type="text"
            value={subTitle}
            name="subTitle"
            onChange={(e) => handleChange(e)}
            placeholder="글자와 사진을 넣은 이후, 배너를 생성할 수 있습니다."
            className={`w-full text-center text-white placeholder-white opacity-80  outline-none md:text-left`}
            style={divStyle}
          />
        </p>
      </div>
    </div>
  );
}
