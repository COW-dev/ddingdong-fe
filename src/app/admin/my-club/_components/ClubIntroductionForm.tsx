'use client';
import Image from 'next/image';

import { ChangeEvent } from 'react';

import {
  Body3,
  Caption1,
  cn,
  Flex,
  MediaUpload,
} from 'ddingdong-design-system';
import TextareaAutosize from 'react-textarea-autosize';

import { ClubDetail } from '@/app/_api/types/club';

import { ClubIntroductionContainer } from '../_containers/ClubContainer';
import { ClubContentContainer } from '../_containers/ClubContentContainer';
import { useClubImage } from '../_hooks/useClubImage';

type Props = {
  club: ClubDetail;
  setClub: React.Dispatch<React.SetStateAction<ClubDetail>>;
  isEditing: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export function ClubIntroductionForm({
  club,
  isEditing,
  setClub,
  onChange,
}: Props) {
  const { introductionImage, introduction, ideal, activity } = club;
  const { mediaPreviewUrls, mediaPreviewFiles, handleFileChange } =
    useClubImage(introductionImage, setClub, 'introductionImage');
  const DDSTextAreaStyle =
    'w-full resize-none rounded-xl border-none bg-white px-4 py-3.5 text-gray-900 outline-1 outline-gray-200 transition-colors placeholder:text-gray-400 focus:ring-4 focus:ring-blue-200 focus:outline-blue-500';
  return (
    <ClubIntroductionContainer>
      <ClubContentContainer
        title={
          <>
            동아리 소개 이미지
            <Caption1 as="span" weight="normal" className="block text-gray-400">
              * 동아리 소개사진을 작성하는란 입니다.
              <Caption1
                as="span"
                weight="normal"
                className="block md:ml-1 md:inline-block"
              >
                동아리 로고사진은 최상단에서 변경해주세요
              </Caption1>
            </Caption1>
          </>
        }
      >
        {isEditing ? (
          <MediaUpload
            previewUrls={mediaPreviewUrls}
            previewFiles={mediaPreviewFiles}
            onFileChange={handleFileChange}
          />
        ) : (
          <>
            {introductionImage ? (
              <div className="my-4 flex justify-center">
                <Image
                  src={introductionImage?.cdnUrl}
                  width={300}
                  priority
                  className="max-h-80"
                  height={300}
                  alt={introductionImage.fileName ?? '소개 이미지'}
                />
              </div>
            ) : (
              <Flex
                dir="col"
                alignItems="center"
                justifyContent="center"
                className="h-30 w-full rounded-xl border border-gray-100 bg-gray-50 p-4 text-gray-300 outline-none md:mt-3 md:mb-6 md:p-5"
              >
                <Body3>동아리 소개 이미지를 설정하지 않았어요.</Body3>
              </Flex>
            )}
          </>
        )}
      </ClubContentContainer>
      <ClubContentContainer title="우리 동아리를 소개할게요">
        <TextareaAutosize
          name="introduction"
          minRows={3}
          value={introduction}
          disabled={!isEditing}
          onChange={onChange}
          className={DDSTextAreaStyle}
        />
      </ClubContentContainer>
      <ClubContentContainer title="이런 활동을 해요">
        <TextareaAutosize
          name="activity"
          minRows={3}
          value={activity}
          disabled={!isEditing}
          onChange={onChange}
          className={DDSTextAreaStyle}
        />
      </ClubContentContainer>
      <ClubContentContainer title="이런 분과 함께하고 싶어요">
        <TextareaAutosize
          name="ideal"
          minRows={3}
          value={ideal}
          disabled={!isEditing}
          onChange={onChange}
          className={DDSTextAreaStyle}
        />
      </ClubContentContainer>
    </ClubIntroductionContainer>
  );
}
