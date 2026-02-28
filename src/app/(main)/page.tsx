import { Suspense } from 'react';

import { Club } from '../_api/types/club';

import { ClubCarousel } from './_components/ClubCarousel';
import { OverviewClientPage } from './_pages/OverviewClientPage';

export const revalidate = 3600;
export const dynamic = 'force-static';

const CACHE_TAGS = {
  CLUBS: 'clubs',
  BANNERS: 'banners',
} as const;

async function getClubsData() {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}clubs`, {
    headers,
    next: {
      tags: [CACHE_TAGS.CLUBS],
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch clubs: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function getBannersData() {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}banners`, {
      headers,
      next: {
        tags: [CACHE_TAGS.BANNERS],
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch banners: ${res.status}`);
      return { data: [] };
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch banners:', error);
    return { data: [] };
  }
}

async function BannerSection() {
  const banners = await getBannersData();
  return <ClubCarousel bannerData={banners} />;
}

async function ClubSection({
  clubsPromise,
}: {
  clubsPromise: Promise<Club[]>;
}) {
  const clubs = await clubsPromise;
  return <OverviewClientPage clubs={clubs} />;
}

export default async function OverviewPage() {
  const clubsPromise = getClubsData();

  return (
    <>
      <Suspense>
        <BannerSection />
      </Suspense>
      <Suspense>
        <ClubSection clubsPromise={clubsPromise} />
      </Suspense>
    </>
  );
}
