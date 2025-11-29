'use client';

import { ChangeEvent } from 'react';

import { Flex, Icon, IconButton } from 'ddingdong-design-system';

import { ClubDetail } from '@/app/_api/types/club';
import { UrlType } from '@/app/_api/types/file';

import { useClubImage } from '../_hooks/useClubImage';

type Props = {
  profileImage: UrlType;
  setClub: React.Dispatch<React.SetStateAction<ClubDetail>>;
};

export function AvatarUpload({ profileImage, setClub }: Props) {
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
          <img
            src={mediaPreviewUrls[0]}
            width={80}
            height={80}
            alt="club logo"
            className="h-20 w-20 rounded-full border border-gray-200 object-cover"
          />
          <IconButton
            iconName="camera"
            color="gray"
            className="absolute start-16 top-0.5 cursor-pointer opacity-40"
            size={20}
            onClick={() => handleFileChange(null, [])}
          />
        </>
      ) : (
        <label
          htmlFor="uploadAvatar"
          className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-3 text-gray-300"
        >
          <Icon name="upload" color="gray" />
          <input
            id="uploadAvatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCustomFileChange}
          />
        </label>
      )}
    </Flex>
  );
}
