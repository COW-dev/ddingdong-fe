import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Camera from '@/assets/camera.svg';
import Cancel from '@/assets/cancel.svg';
import { NoticeDetail } from '@/types/notice';
import { EditReport } from '@/types/report';
import { cn } from '../ui/utils';
import { ClubDetail } from '@/app/_api/types/club';
import { UrlType } from '@/app/_api/types/common';
import { UploadFile } from '@/app/_api/types/file';

type UploadImageProps = {
  image?: File | null;
  setImage?: Dispatch<SetStateAction<File | null>>;
  imageUrls?: UrlType;
  setNoticeData?:
    | Dispatch<SetStateAction<NoticeDetail>>
    | Dispatch<SetStateAction<ClubDetail>>
    | Dispatch<SetStateAction<EditReport>>;
  urlsName?: string;
  setRemoveFile?: Dispatch<SetStateAction<boolean>>;
  id?: number;
  onAdd: (file: File) => Promise<UploadFile>;
  className?: string;
};

export default function UploadImage({
  image,
  setImage,
  urlsName,
  imageUrls,
  setNoticeData,
  setRemoveFile,
  id,
  onAdd,
  className,
}: UploadImageProps) {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

  useEffect(() => {
    if (!image && imageUrls?.originUrl) {
      setPreviewImageUrl(imageUrls?.originUrl || '');
      return;
    }
    if (image) {
      const url = window.URL.createObjectURL(image);
      setPreviewImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    return setPreviewImageUrl('');
  }, [image, imageUrls, setImage]);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const uploadImage = await onAdd(file);
      setImage && setImage(uploadImage.file);
      const imageUrl = URL.createObjectURL(uploadImage.file);
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
        [urlsName ? `${urlsName}` : `imageUrls`]: null,
      }));
  }

  return (
    <div className={cn('flex w-full justify-center p-6', className)}>
      {previewImageUrl ? (
        <>
          <Image
            src={previewImageUrl}
            className="m-auto h-72 max-w-[90%] object-scale-down"
            alt="이미지"
            priority
            width={1032}
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
          htmlFor={`dropzone-file-${id}`}
          className="dar flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-none border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
            <Image src={Camera} width={30} height={30} alt="upload" />
            <p className="m-2 text-sm">Click to ImageUpload</p>
            <p className="text-xs text-gray-400">
              SVG, PNG, JPG (MAX. 800x400px)
            </p>
          </div>
          <input
            id={`dropzone-file-${id}`}
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
