'use client';
import { useParams } from 'next/navigation';

import { useCookie } from '@/app/_api/useCookie';
import ClubScore from '@/app/admin/club/[id]/score/_components/ClubScore';
import AdminScore from '@/components/score/AdminScore';
import { ROLE_TYPE } from '@/constants/text';

export default function ScorePageClient() {
  const { cookie } = useCookie();
  const params = useParams<{ id: string }>();
  const clubId = Number(params.id);
  const isAdmin = cookie.role === ROLE_TYPE.ROLE_ADMIN;

  return <>{isAdmin ? <AdminScore clubId={clubId} /> : <ClubScore />}</>;
}
