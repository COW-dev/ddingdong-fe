import React, { useState } from 'react';
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

  const [formKey, setFormKey] = useState(0);

  const handleResetForm = () => {
    setFormKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      {formData && !isLoading && (
        <ManageForm
          key={formKey}
          formData={formData}
          id={Number(id)}
          onReset={handleResetForm}
        />
      )}
    </div>
  );
}
