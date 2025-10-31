'use client';

import { useRouter } from 'next/navigation';

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
    images,
    isImageLoading,
    isFileLoading,
    handleChangeNoticeData,
    handleClickImageUpload,
    handleClickFileUpload,
    handleClickFileDelete,
  } = useNewNotice();

  const isUploading = isImageLoading || isFileLoading;

  const handleNoticeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!noticeData.title || !noticeData.content) {
      toast.error('제목과 내용을 입력해주세요.');
      return;
    }

    addNotice(
      {
        title: noticeData.title,
        content: noticeData.content,
        files: createImageOrder(files.map((file) => file.id)),
        images: createImageOrder(images.map((image) => image.id)),
      },
      {
        onSuccess: () => {
          toast.success('공지사항이 작성되었습니다.');
          router.push('/notice');
        },
        onError: (error) => {
          if (error instanceof ApiError) {
            toast.error(error.message);
            return;
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
      <form className="flex flex-col" onSubmit={handleNoticeSubmit}>
        <textarea
          name="title"
          value={noticeData.title}
          rows={1}
          spellCheck={false}
          className="z-10 w-full resize-none rounded-none border-b border-gray-200 pb-2 text-xl font-semibold outline-none placeholder:text-gray-300 md:text-2xl"
          placeholder="제목"
          onChange={(e) => handleChangeNoticeData(e)}
        />
        <Flex className="mt-6 min-h-80 overflow-y-scroll">
          {isImageLoading ? (
            <Flex justifyContent="center" className="h-full w-full p-4">
              <Loading />
            </Flex>
          ) : (
            <MediaUpload
              multiple
              previewFiles={images.map((image) => image.file)}
              previewUrls={images.map((image) => image.previewUrl)}
              onFileChange={(files: File[] | null, urls: string[]) => {
                handleClickImageUpload(files ?? [], urls);
              }}
            />
          )}
        </Flex>
        <textarea
          name="content"
          value={noticeData.content}
          rows={8}
          spellCheck={false}
          placeholder="내용을 입력하세요"
          className="z-10 mt-6 h-auto w-full resize-none overflow-hidden overflow-y-scroll rounded-none border-b border-gray-200 pb-2 text-base font-medium outline-none placeholder:text-gray-300 md:mt-6 md:pb-3 md:text-lg"
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
        {isFileLoading && (
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
      </form>
    </>
  );
}
