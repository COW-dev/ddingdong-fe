import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import Camera from '@/assets/camera.svg';
import Cancel from '@/assets/cancle.svg';
import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import ImagesController from './ImagesController';
type UploadImageProps = {
  image: File[];
  setImage: Dispatch<SetStateAction<File[]>>;
};

export default function UploadMultipleImage({
  image,
  setImage,
}: UploadImageProps) {
  const [presentIndex, setPresentIndex] = useState<number>(0);

  function handleImageAdd(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        image?.push(file);
      }
      setImage([...image]);
    }
  }

  function handleImageDelete() {
    image.splice(presentIndex, 1);
    if (presentIndex === image.length) setPresentIndex(0);
    setImage([...image]);
  }
  return (
    <div className="flex w-full justify-center p-6">
      {image.length !== 0 ? (
        <>
          <div className="relative">
            <div className="flex">
              <Image
                src={LeftArrow}
                height={20}
                width={20}
                alt="left"
                onClick={() => setPresentIndex(presentIndex - 1)}
                className={`${presentIndex === 0 && `hidden`}`}
              />
              <Image
                src={URL.createObjectURL(image[presentIndex])}
                className="m-auto h-72 overflow-hidden object-scale-down p-3"
                alt="이미지"
                width={1000}
                height={200}
              />
              <Image
                src={RightArrow}
                height={20}
                width={20}
                alt="right"
                onClick={() => setPresentIndex(presentIndex + 1)}
                className={`${presentIndex === image.length - 1 && `hidden`}`}
              />

              <div className="mr-3 mt-5" onClick={handleImageDelete}>
                <Image src={Cancel} height={20} width={20} alt="cancel" />
              </div>
            </div>
            <ImagesController
              handleImageAdd={handleImageAdd}
              image={image}
              setPresentIndex={setPresentIndex}
              presentIndex={presentIndex}
              handleImageDelete={handleImageDelete}
            />
          </div>
        </>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-none border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5 text-gray-400">
            <Image src={Camera} width={30} height={30} alt="upload" />
            <p className="m-2 text-sm  ">Click to ImageUpload</p>
            <p className=" text-xs text-gray-400">
              SVG, PNG, JPG (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleImageAdd}
          />
        </label>
      )}
    </div>
  );
}
