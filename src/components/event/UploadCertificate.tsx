import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react';
import Image from 'next/image';
import Cancel from '@/assets/cancle.svg';

type Props = {
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
};
export default function UploadCertificate({ image, setImage }: Props) {
  const [preview, setPreviewImageUrl] = useState<string>('');
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const file = event.target.files[0];
      setImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  }
  function handleImageReset() {
    setImage(null);
    setPreviewImageUrl('');
  }
  return (
    <>
      <div className="flex mt-2 h-60 w-full justify-center">
        {image || preview ? (
          <>
            <Image
              src={preview}
              width={200}
              height={500}
              className="h-60 object-scale-down"
              alt="납입증명서"
            />
            <div className=" absolute right-3 top-60 z-30 mt-2 min-w-[10%]">
              <button type="button" onClick={handleImageReset}>
                <Image src={Cancel} height={15} width={15} alt="cancel" />
              </button>
            </div>
          </>
        ) : (
          <>
            <label
              htmlFor="image"
              className="flex h-60 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-none border-gray-300 "
            >
              <div className=" flex h-full w-full flex-col items-center justify-center rounded-xl bg-pink-50">
                <div className="cursor-pointer text-4xl font-bold text-pink-400 ">
                  +
                </div>
                <div className="mt-5 cursor-pointer text-xl font-bold text-pink-400 ">
                  이미지 파일 첨부하기
                </div>
              </div>
              <input
                id="image"
                className=" hidden"
                name="excel"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </>
        )}
      </div>
    </>
  );
}
