'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Flex,
  Title1,
  Button,
  Body3,
  usePortal,
} from 'ddingdong-design-system';

import { bannerQueryOptions } from '@/app/_api/queries/banner';
import Banner from '@/app/admin/banner/_components/Banner';
import { ROLE_TYPE, RoleType } from '@/constants/role';

import { UploadModal } from '../_components/UploadModal';

export default function BannerClientPage({ role }: { role: keyof RoleType }) {
  const { data: bannerData } = useSuspenseQuery(bannerQueryOptions.all());
  const { isOpen, openModal, closeModal } = usePortal();

  if (role === ROLE_TYPE.ROLE_CLUB) {
    return null;
  }

  return (
    <>
      <Flex justifyContent="between" alignItems="center">
        <Title1 as="h1" weight="bold" className="py-7 md:py-10">
          배너 관리하기
        </Title1>
        <Button size="md" variant="secondary" color="blue" onClick={openModal}>
          <Body3 weight="bold">업로드</Body3>
        </Button>
      </Flex>
      {bannerData?.map((data, index) => (
        <Banner data={data} key={index} />
      ))}
      <UploadModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
