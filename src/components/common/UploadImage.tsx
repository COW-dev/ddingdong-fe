import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Camera from '@/assets/camera.svg';
import Cancel from '@/assets/cancle.svg';
type UploadImageProps = {
  image: File | string | null;
  setImage: Dispatch<SetStateAction<File | string | null>>;
};

export default function UploadImage({ image, setImage }: UploadImageProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  useEffect(() => {
    if (image) {
      if (image instanceof File) {
        setImage(image);
        const imageUrl = URL.createObjectURL(image);
        setPreviewImageUrl(imageUrl);
      } else {
        setPreviewImageUrl(image as string);
      }
    } else {
      setPreviewImageUrl('');
    }
  }, [image]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
    }
  }
  function handleImageReset() {
    setImage(null);
  }

  return (
    <div className="flex w-full justify-center">
      {image ? (
        <>
          <Image
            src={previewImageUrl}
            className="m-auto h-72 object-scale-down"
            alt="이미지"
            width={1000}
            height={200}
          />
          <div className="mt-5">
            <button type="button" onClick={handleImageReset}>
              <Image src={Cancel} height={15} width={15} alt="cancel" />
            </button>
          </div>
        </>
      ) : (
        <label
          htmlFor="dropzone-file"
          className=" flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-none border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Image src={Camera} width={30} height={30} alt="upload" />
            <p className="mb-2 text-sm text-gray-300 ">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-300">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
}
