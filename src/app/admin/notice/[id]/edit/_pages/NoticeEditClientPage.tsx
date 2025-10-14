'use client';

import { useRouter } from 'next/navigation';

import { FormEvent } from 'react';

import {
  Body3,
  Button,
  FileUpload,
  Flex,
  IconButton,
  MediaUpload,
  Title1,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useUpdateNotice } from '@/app/_api/mutations/notice';
import { createImageOrder } from '@/utils/change';

import { useEditNotice } from '../_hooks/useEditNotice';

export default function NoticeEditClientPage({
  noticeId,
}: {
  noticeId: number;
}) {
  const router = useRouter();
  const { mutate: updateNotice, isPending: isUpdatingNotice } =
    useUpdateNotice(noticeId);
  const {
    noticeEditData,
    files,
    imageIds,
    isUploading,
    handleChangeNoticeData,
    handleClickImageUpload,
    handleClickFileUpload,
    handleClickFileDelete,
  } = useEditNotice(noticeId);

  const handleNoticeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!noticeEditData.title || !noticeEditData.content) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    updateNotice(
      {
        noticeId: noticeId,
        title: noticeEditData.title,
        content: noticeEditData.content,
        files:
          files.length > 0
            ? createImageOrder(files.map((file) => file.id ?? ''))
            : null,
        images:
          imageIds.length > 0
            ? createImageOrder(imageIds.map((image) => image.id ?? ''))
            : null,
      },
      {
        onSuccess: () => {
          toast.success('공지사항이 수정되었습니다.');
          router.push(`/notice/${noticeId}`);
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
          }
          toast.error('공지사항 수정에 실패했습니다.');
        },
      },
    );
  };

  return (
    <>
      <Flex justifyContent="between" alignItems="end" className="py-7 md:py-10">
        <Title1 weight="bold">공지사항 작성하기</Title1>
        <Body3 className="text-gray-400">
          {new Date(noticeEditData.createdAt ?? '').toLocaleString()}
        </Body3>
      </Flex>
      <Flex as="form" dir="col" onSubmit={handleNoticeSubmit}>
        <textarea
          name="title"
          value={noticeEditData.title}
          rows={1}
          spellCheck={false}
          className="w-full resize-none rounded-none border-b border-gray-200 pb-2 text-xl font-semibold outline-none placeholder:text-gray-300 md:pb-3 md:text-2xl"
          placeholder="제목"
          onChange={(e) => handleChangeNoticeData(e)}
        />

        <Flex className="mt-6 min-h-80 overflow-y-scroll">
          <MediaUpload
            key={imageIds.map((img) => img.id).join(',')}
            multiple
            initialPreviewUrls={imageIds.map((img) => img.cdnUrl)}
            initialFiles={imageIds.map(
              (img) => new File([], img.fileName ?? ''),
            )}
            onFileUpload={(files) => handleClickImageUpload(files)}
          />
        </Flex>
        <textarea
          name="content"
          value={noticeEditData.content}
          rows={8}
          spellCheck={false}
          placeholder="내용을 입력하세요"
          className="mt-6 h-auto w-full resize-none overflow-hidden rounded-none border-b border-gray-200 pb-2 text-base font-medium outline-none placeholder:text-gray-300 md:mt-8 md:pb-3 md:text-lg"
          onChange={(e) => handleChangeNoticeData(e)}
        />
        <Flex className="mt-6">
          <FileUpload
            mode="multiple"
            onChange={(e) =>
              handleClickFileUpload(
                e.target.files ? Array.from(e.target.files) : [],
              )
            }
          />
        </Flex>
        {files.length > 0 && (
          <Flex dir="col" gap={2} className="mt-2 ml-2">
            {files.map((file, idx) => (
              <Flex key={idx} alignItems="center" gap={2}>
                <Body3 className="text-gray-500">{file.fileName}</Body3>
                <IconButton
                  iconName="close"
                  size={16}
                  color="gray"
                  onClick={() => handleClickFileDelete(file.fileName ?? '')}
                />
              </Flex>
            ))}
          </Flex>
        )}
        <Flex justifyContent="end" className="mt-4 md:mt-6">
          <Button
            type="submit"
            variant="secondary"
            color="blue"
            size="lg"
            disabled={isUploading || isUpdatingNotice}
          >
            수정하기
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
