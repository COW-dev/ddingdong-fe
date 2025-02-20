import React from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import ManageForm from '@/components/apply/ManageForm';
import { useAdminForm } from '@/hooks/api/apply/useAdminForm';

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const [cookies] = useCookies();
  const token = cookies.token;

  const { data, isLoading } = useAdminForm(token, Number(id));

  const formData = data?.data || null;

  return (
    <div>
      {formData && !isLoading && (
        <ManageForm formData={formData} id={Number(id)} />
      )}
    </div>
  );
}
