import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Camera from '@/assets/camera.svg';
import Cancel from '@/assets/cancel.svg';
import { ClubDetail } from '@/types/club';
import { NoticeDetail } from '@/types/notice';
import { parseImgUrl } from '@/utils/parse';
type UploadImageProps = {
  image?: File | null;
  setImage?: Dispatch<SetStateAction<File | null>>;
  imageUrls?: string[];
  setNoticeData?:
    | Dispatch<SetStateAction<NoticeDetail>>
    | Dispatch<SetStateAction<ClubDetail>>;
  urlsName?: string;
  setRemoveFile?: Dispatch<SetStateAction<boolean>>;
};

export default function UploadImage({
  image,
  setImage,
  urlsName,
  imageUrls,
  setNoticeData,
  setRemoveFile,
}: UploadImageProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');
  useEffect(() => {
    if (image) {
      if (image instanceof File) {
        setImage && setImage(image);
        const imageUrl = URL.createObjectURL(image);
        setPreviewImageUrl(imageUrl);
      } else {
        setPreviewImageUrl(image as string);
      }
    } else {
      imageUrls?.length === 1
        ? setPreviewImageUrl(parseImgUrl(imageUrls[0]))
        : setPreviewImageUrl('');
    }
  }, [image, imageUrls, setImage]);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage && setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
    }
  }

  function handleImageReset() {
    if (setRemoveFile) setRemoveFile(true);
    setImage && setImage(null);
    setPreviewImageUrl('');
    setNoticeData &&
      setNoticeData((prev: any) => ({
        ...prev,
        [urlsName ? `${urlsName}` : `imageUrls`]: [],
      }));
  }

  return (
    <div className="flex w-full justify-center p-6">
      {image || previewImageUrl ? (
        <>
          <Image
            src={previewImageUrl}
            className="m-auto  h-72 object-scale-down "
            alt="이미지"
            width={1000}
            height={200}
          />
          <div className="z-30 mt-5 min-w-[10%]">
            <button type="button" onClick={handleImageReset}>
              <Image src={Cancel} height={15} width={15} alt="cancel" />
            </button>
          </div>
        </>
      ) : (
        <label
          htmlFor="dropzone-file"
          className=" dar flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-none border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5 text-gray-400">
            <Image src={Camera} width={30} height={30} alt="upload" />
            <p className="m-2 text-sm">Click to ImageUpload</p>
            <p className=" text-xs text-gray-400">
              SVG, PNG, JPG (MAX. 800x400px)
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
