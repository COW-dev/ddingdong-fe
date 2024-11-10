import { useState } from 'react';
import Image from 'next/image';
import Camera from '@/assets/camera.svg';
import Cancel from '@/assets/cancel.svg';
import LeftArrow from '@/assets/leftArrow.svg';
import RightArrow from '@/assets/rightArrow.svg';
import { UploadFile } from '@/hooks/common/usePresignedUrl';
import ImagesController from './ImagesController';
import Loading from '../loading/Loading';

type UploadImageProps = {
  isLoading: boolean;
  onAdd: (file: File[]) => Promise<UploadFile[]>;
  onDelete: (index: number) => void;
};

export default function UploadMultipleImage({
  isLoading,
  onAdd,
  onDelete,
}: UploadImageProps) {
  const [presentIndex, setPresentIndex] = useState<number>(0);
  const [image, setImage] = useState<File[]>([]);

  async function handleImageAdd(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const uploadInfo = await onAdd(Array.from(event.target.files));
      const uploadfiles = uploadInfo.map((info) => info.file);
      setImage([...image, ...uploadfiles]);
    }
  }

  function handleImageDelete() {
    image.splice(presentIndex, 1);
    if (presentIndex === image.length) setPresentIndex(0);
    setImage([...image]);
    onDelete(presentIndex);
  }

  if (isLoading)
    return (
      <div className="flex h-full w-full justify-center p-6">
        <Loading />
      </div>
    );

  return (
    <div className="flex h-full w-full justify-center p-6">
      {image.length !== 0 ? (
        <>
          <div className="relative h-96">
            <div className="flex">
              <Image
                src={LeftArrow}
                height={25}
                width={25}
                alt="left"
                onClick={() => setPresentIndex(presentIndex - 1)}
                className={`${presentIndex === 0 && `hidden`}`}
              />
              <Image
                src={URL.createObjectURL(image[presentIndex])}
                className=" m-auto h-96 overflow-hidden rounded-lg object-scale-down"
                alt="이미지"
                width={800}
                height={200}
              />
              <Image
                src={RightArrow}
                height={25}
                width={25}
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
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-none border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center p-4 text-gray-400">
            <Image src={Camera} width={30} height={30} alt="upload" />
            <p className="m-2 text-sm">Click to ImageUpload</p>
            <p className="text-xs text-gray-400">
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
