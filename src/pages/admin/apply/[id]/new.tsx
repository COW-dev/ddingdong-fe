import React from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import ManageForm from '@/components/apply/ManageForm';
import Skeleton from '@/components/common/Skeleton';
import { useAdminForm } from '@/hooks/api/apply/useAdminForm';

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const [cookies] = useCookies();
  const token = cookies.token;

  const { data, isLoading } = useAdminForm(token, Number(id));

  if (isLoading) return <Skeleton />;

  const formData = data?.data || null;

  return (
    <div>
      {formData ? (
        <ManageForm formData={formData} id={Number(id)} />
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
