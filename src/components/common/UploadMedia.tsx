import { useState } from 'react';
import Image from 'next/image';
import Camera from '@/assets/camera.svg';
import { UploadFile } from '@/types';
import Loading from '../loading/Loading';

type Props = {
  onAdd: (file: File) => Promise<UploadFile>;
  isLoading: boolean;
};

export default function UploadMedia({ onAdd, isLoading }: Props) {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const uploadImage = await onAdd(file);
      setMediaFile(uploadImage.file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  }

  function handleDelete() {
    setMediaFile(null);
    setPreviewUrl(null);
  }

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      {mediaFile ? (
        <div className="relative h-80 w-full border-gray-50 bg-gray-50 md:h-96">
          {mediaFile.type.startsWith('video/') ? (
            <video
              src={previewUrl || undefined}
              controls
              className="h-full w-full rounded-xl border object-contain"
            />
          ) : (
            <Image
              width={300}
              height={300}
              src={previewUrl || ''}
              alt="Uploaded Media Preview"
              className="h-full w-full rounded-xl border object-contain"
            />
          )}
          <button
            onClick={handleDelete}
            className="absolute right-2 top-2 rounded-lg bg-red-500 p-2 text-xs font-bold text-white shadow-md hover:bg-red-600"
          >
            제거
          </button>
        </div>
      ) : (
        <label
          htmlFor={`media`}
          className=" flex h-96 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5 text-gray-400">
            <Image src={Camera} width={30} height={30} alt="upload" />
            <p className="m-2 text-sm">Click to ImageUpload</p>
            <p className=" text-xs text-gray-400">
              * 파일 용량은 최대 300MB까지 업로드 가능합니다.
            </p>
          </div>
          <input
            id={`media`}
            type="file"
            accept="image/*, video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
