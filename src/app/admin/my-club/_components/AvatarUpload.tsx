'use client';

import Image from 'next/image';
import { ChangeEvent } from 'react';
import Camera from '@/assets/camera.svg';
import ImageInput from '@/assets/imageInput.svg';
import { Flex } from 'ddingdong-design-system';
import { useClubImage } from '../_hooks/useClubImage';
import { UrlType } from '@/app/_api/types/common';

type AvatarUploadProps = {
  isEditing: boolean;
  profileImage: UrlType;
  setClub: React.Dispatch<React.SetStateAction<any>>;
};

export default function AvatarUpload({
  isEditing,
  profileImage,
  setClub,
}: AvatarUploadProps) {
  const { mediaPreviewUrls, handleFileChange } = useClubImage(
    profileImage,
    setClub,
    'profileImage',
  );

  const handleCustomFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : null;
    const urls = files ? files.map((file) => URL.createObjectURL(file)) : [];
    handleFileChange(files, urls);
  };

  return (
    <Flex alignItems="center" justifyContent="center" className="relative">
      {mediaPreviewUrls.length > 0 ? (
        <>
          <Image
            src={mediaPreviewUrls[0]}
            width={80}
            height={80}
            alt="club logo"
            priority
            className="h-20 w-20 rounded-full border border-gray-200 object-cover"
          />
          <Image
            src={Camera}
            onClick={() => handleFileChange(null, [])}
            width={20}
            height={20}
            alt="reset"
            className="absolute start-16 top-0.5 cursor-pointer opacity-40"
          />
        </>
      ) : (
        <label
          htmlFor="uploadAvatar"
          className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-3 text-gray-300 md:h-24 md:w-24"
        >
          <Image src={ImageInput} width={35} height={35} alt="logo select" />
          <input
            id="uploadAvatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCustomFileChange}
            disabled={!isEditing}
          />
        </label>
      )}
    </Flex>
  );
}
