'use client';

import { useQuery, useSuspenseQueries } from '@tanstack/react-query';
import { Flex } from 'ddingdong-design-system';

import { bannerQueryOptions } from '@/app/_api/queries/banner';
import { clubQueryOptions } from '@/app/_api/queries/club';
import { documentQueryOptions } from '@/app/_api/queries/document';
import { noticeQueryOptions } from '@/app/_api/queries/notice';
import { ClubCarousel } from '@/app/overview/_components/ClubCarousel';
import { ROLE_TYPE } from '@/constants/role';
import { useClubStore } from '@/store/club';

import { AdminGreeting } from '../_component/AdminGreeting';
import { DashboardGrid } from '../_component/DashboardGrid';
import { DocumentCard } from '../_component/DocumentCard';
import { NoticeCard } from '../_component/NoticeCard';
import { ROLE_DASHBOARD } from '../_constants/dashboard';

export default function AdminPage({ role }: { role: string }) {
  const { data: myClubData, isLoading } = useQuery({
    ...clubQueryOptions.my(),
    enabled: role === ROLE_TYPE.ROLE_CLUB,
  });

  const [{ data: documentData }, { data: noticeData }, { data: bannerData }] =
    useSuspenseQueries({
      queries: [
        documentQueryOptions.all(1),
        noticeQueryOptions.all(1),
        bannerQueryOptions.all(),
      ],
    });

  useClubStore((state) => state.setClub);

  if (isLoading) return null;
  if (!ROLE_DASHBOARD[role]) return;

  return (
    <Flex dir="col">
      <Flex alignItems="end" justifyContent="between">
        <AdminGreeting
          name={role === ROLE_TYPE.ROLE_ADMIN ? 'MODE' : myClubData?.name}
        />
      </Flex>
      <div className="mt-7">
        <ClubCarousel bannerData={bannerData} />
      </div>
      <DashboardGrid role={role} />
      <NoticeCard role={role} noticeData={noticeData.notices} />
      <DocumentCard role={role} documentData={documentData.documents} />
    </Flex>
  );
}
