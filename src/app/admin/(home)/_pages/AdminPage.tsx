'use client';

import { useEffect } from 'react';

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
  const { data: myClubData } = useQuery({
    ...clubQueryOptions.my(),
    enabled: Boolean(role) && role === ROLE_TYPE.ROLE_CLUB,
  });

  const [{ data: documentData }, { data: noticeData }, { data: bannerData }] =
    useSuspenseQueries({
      queries: [
        documentQueryOptions.all(1),
        noticeQueryOptions.all(1),
        bannerQueryOptions.all(),
      ],
    });

  const setClub = useClubStore((state) => state.setClub);

  useEffect(() => {
    if (myClubData) {
      setClub(myClubData);
    }
  }, [myClubData, setClub]);

  if (!ROLE_DASHBOARD[role]) return null;

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
      <NoticeCard role={role} noticeData={noticeData?.notices} />
      <DocumentCard role={role} documentData={documentData?.documents} />
    </Flex>
  );
}
