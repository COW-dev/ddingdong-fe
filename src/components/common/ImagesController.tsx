import React, { Dispatch, useState } from 'react';
import Image from 'next/image';
import Camera from '@/assets/camera.svg';
import Cancel from '@/assets/cancel.svg';
import Images from '@/assets/images.svg';

type Props = {
  image: File[] | null;
  handleImageAdd: Dispatch<React.ChangeEvent<HTMLInputElement>>;
  presentIndex: number;
  setPresentIndex: Dispatch<number>;
  handleImageDelete: () => void;
};
export default function ImagesController({
  image,
  handleImageAdd,
  presentIndex,
  setPresentIndex,
  handleImageDelete,
}: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      {/* 내용 */}
      <div
        className={`absolute bottom-10 right-0 h-[20vh] min-w-[50%] max-w-[80%] rounded-xl bg-black bg-opacity-50 ${
          !isActive && `hidden`
        }`}
      >
        <div className="flex w-full justify-between">
          <div className="flex w-full  min-w-[70%] overflow-y-hidden overflow-x-scroll">
            {image?.map((item, index) => (
              <div
                key={`upload-imges` + index}
                className={`relative mx-3 my-6 h-20 min-w-[12vh] overflow-hidden rounded-xl  ${
                  presentIndex === index && `border-2 border-white`
                }`}
              >
                <Image
                  src={URL.createObjectURL(item)}
                  width={100}
                  height={100}
                  alt="image"
                  className="h-20 w-[12vh] object-cover "
                  onClick={() => setPresentIndex(index)}
                />
                <Image
                  src={Cancel}
                  width={16}
                  height={16}
                  className={`absolute right-1 top-1 z-40 rounded-2xl bg-white bg-opacity-50 p-1 hover:bg-gray-200 ${
                    presentIndex !== index && `hidden`
                  }`}
                  alt="image"
                  onClick={handleImageDelete}
                />
              </div>
            ))}
          </div>
          <div className="mx-3 my-10 flex h-full min-w-[30%] flex-col items-center justify-center">
            <label htmlFor="dropzone-file">
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageAdd}
              />
              <Image src={Camera} width={40} height={40} alt="image" />
            </label>
          </div>
        </div>
      </div>
      {/* 버튼 */}
      <div
        onClick={() => setIsActive(!isActive)}
        className={`absolute bottom-0 right-0 rounded-3xl bg-black bg-opacity-70 p-1.5 hover:bg-opacity-100 ${
          isActive &&
          `flex h-9 w-9 flex-col items-center justify-center bg-opacity-40 hover:bg-opacity-70`
        }`}
      >
        <Image
          src={isActive ? Cancel : Images}
          width={isActive ? 14 : 25}
          height={isActive ? 14 : 25}
          alt="multiImage"
        />
      </div>
    </>
  );
}
