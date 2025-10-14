'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Body2,
  Body3,
  Button,
  Flex,
  Title2,
  usePortal,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { ApiError } from '@/app/_api/fetcher';
import { useDeleteNotice } from '@/app/_api/mutations/notice';
import { noticeQueryOptions } from '@/app/_api/queries/notice';
import { NoticeDetailContent } from '@/app/notice/[id]/_components/NoticeDetailContent';
import { NoticeDetailFile } from '@/app/notice/[id]/_components/NoticeDetailFile';
import { ROLE_TYPE, RoleType } from '@/constants/role';

import { DeleteModal } from '../_components/DeleteModal';

export function NoticeDetailAdminClientPage({
  role,
  noticeId,
}: {
  role: keyof RoleType;
  noticeId: number;
}) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = usePortal();
  const { data: noticeDetail } = useSuspenseQuery(
    noticeQueryOptions.detail(noticeId),
  );

  const { mutate: deleteNotice } = useDeleteNotice();

  const handleDeleteNotice = () => {
    deleteNotice(noticeId, {
      onSuccess: () => {
        closeModal();
        router.push('/notice');
        toast.success('공지사항을 성공적으로 삭제했어요.');
      },
      onError: (error) => {
        if (error instanceof ApiError) {
          toast.error(error.message);
        }
        toast.error('공지사항 삭제에 실패했어요.');
      },
    });
  };

  return (
    <>
      <Title2 as="h1" weight="bold" className="pt-7 md:pt-10">
        {noticeDetail.title}
      </Title2>
      <Flex justifyContent="between" alignItems="center">
        <Body2 weight="medium" className="my-2 text-gray-300">
          {new Date(noticeDetail.createdAt ?? '').toLocaleString()}
        </Body2>
        {role === ROLE_TYPE.ROLE_ADMIN && (
          <Flex gap={4}>
            <Link href={`/notice/${noticeId}/edit`}>
              <Body3 role="button" className="cursor-pointer text-gray-500">
                수정
              </Body3>
            </Link>
            <Body3
              role="button"
              className="cursor-pointer text-red-300"
              onClick={openModal}
            >
              삭제
            </Body3>
          </Flex>
        )}
      </Flex>
      <div className="border-b border-gray-200" />
      <NoticeDetailContent
        content={noticeDetail.content}
        images={noticeDetail.images}
      />
      <div className="border-b border-gray-200" />
      <NoticeDetailFile files={noticeDetail.files} />
      <Flex justifyContent="end" className="mt-4">
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => router.push('/notice')}
        >
          <Body2>목록으로 돌아가기</Body2>
        </Button>
      </Flex>
      <DeleteModal
        title={noticeDetail.title}
        isOpen={isOpen}
        closeModal={closeModal}
        onDeleteNotice={handleDeleteNotice}
      />
    </>
  );
}
