'use client';

import { useEffect } from 'react';

import { Flex } from '@dds/shared';
import { useQuery, useSuspenseQueries } from '@tanstack/react-query';

import { ClubCarousel } from '@/(main)/_components/ClubCarousel';
import { bannerQueryOptions } from '@/_api/queries/banner';
import { clubQueryOptions } from '@/_api/queries/club';
import { documentQueryOptions } from '@/_api/queries/document';
import { noticeQueryOptions } from '@/_api/queries/notice';
import { ROLE_TYPE } from '@/_constants/role';
import { useClubStore } from '@/_store/club';

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
          name={role === ROLE_TYPE.ROLE_ADMIN ? 'SO:ONE' : myClubData?.name}
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
