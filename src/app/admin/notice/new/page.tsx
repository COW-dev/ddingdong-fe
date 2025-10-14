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
import { useAddNotice } from '@/app/_api/mutations/notice';
import { Loading } from '@/components/loading/Loading';
import { createImageOrder } from '@/utils/change';

import { useNewNotice } from './_hook/useNewNotice';

export default function NoticeNewPage() {
  const router = useRouter();
  const { mutate: addNotice, isPending: isAddingNotice } = useAddNotice();
  const {
    noticeData,
    files,
    imageIds,
    isUploading,
    handleChangeNoticeData,
    handleClickImageUpload,
    handleClickFileUpload,
    handleClickFileDelete,
  } = useNewNotice();

  const handleNoticeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!noticeData.title || !noticeData.content) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    addNotice(
      {
        title: noticeData.title,
        content: noticeData.content,
        files: createImageOrder(files.map((file) => file.id)),
        images: createImageOrder(imageIds.map((image) => image.id)),
      },
      {
        onSuccess: () => {
          toast.success('공지사항이 작성되었습니다.');
          router.push('/notice');
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
          }
          toast.error('공지사항 작성에 실패했습니다.');
        },
      },
    );
  };
  return (
    <>
      <Title1 weight="bold" className="py-7 md:py-10">
        공지사항 작성하기
      </Title1>
      <Flex as="form" dir="col" onSubmit={handleNoticeSubmit}>
        <textarea
          name="title"
          value={noticeData.title}
          rows={1}
          spellCheck={false}
          className="w-full resize-none rounded-none border-b border-gray-200 pb-2 text-xl font-semibold outline-none placeholder:text-gray-300 md:text-2xl"
          placeholder="제목"
          onChange={(e) => handleChangeNoticeData(e)}
        />
        <Flex className="mt-6 min-h-80 overflow-y-scroll">
          <MediaUpload
            multiple
            onFileUpload={(files) => handleClickImageUpload(files ?? [])}
          />
        </Flex>
        <textarea
          name="content"
          value={noticeData.content}
          rows={8}
          spellCheck={false}
          placeholder="내용을 입력하세요"
          className="mt-6 h-auto w-full resize-none overflow-hidden overflow-y-scroll rounded-none border-b border-gray-200 pb-2 text-base font-medium outline-none placeholder:text-gray-300 md:mt-8 md:pb-3 md:text-lg"
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
        {isUploading && (
          <Flex justifyContent="center" className="h-full w-full p-4">
            <Loading />
          </Flex>
        )}
        {files && (
          <Flex dir="col" gap={2} className="mt-2 ml-2">
            {files.map((file, idx) => (
              <Flex key={idx} alignItems="center" gap={2}>
                <Body3 className="text-gray-500">{file.name}</Body3>
                <IconButton
                  iconName="close"
                  size={16}
                  color="gray"
                  onClick={() => handleClickFileDelete(file.name)}
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
            disabled={isUploading || isAddingNotice}
          >
            작성하기
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
