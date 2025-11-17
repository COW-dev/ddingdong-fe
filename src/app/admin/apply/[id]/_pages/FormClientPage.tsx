'use client';

import Link from 'next/link';

import { TabItem, Tabs } from 'ddingdong-design-system';

import { ApplicantList } from '../_components/applicants/ApplicantList';
import { FormStatusInfo } from '../_components/filter/FormStatusInfo';
import { FormHeader } from '../_components/header/FormHeader';
import { useFormActions } from '../_hooks/useFormActions';
import { useFormData } from '../_hooks/useFormData';

export function FormClientPage({ id }: { id: number }) {
  const { applicationData, documentApplicants, interviewApplicants } =
    useFormData(id);
  const { handleRegister, handleDelete } = useFormActions(id);

  return (
    <>
      <FormHeader
        title={applicationData.title}
        formId={id}
        onDelete={handleDelete}
        onRegister={handleRegister}
      />
      <FormStatusInfo
        formStatus={applicationData.formStatus}
        startDate={applicationData.startDate}
        endDate={applicationData.endDate}
        hasInterview={applicationData.hasInterview}
        onRegister={handleRegister}
        formId={id}
      />
      {applicationData.hasInterview ? (
        <Tabs key={`tabs-${id}`} defaultIndex={0}>
          <TabItem label="서류">
            <ApplicantList
              formId={id}
              type="DOCUMENT"
              applicants={documentApplicants ?? []}
            />
          </TabItem>
          <TabItem label="면접">
            <ApplicantList
              formId={id}
              type="INTERVIEW"
              applicants={interviewApplicants ?? []}
            />
          </TabItem>
        </Tabs>
      ) : (
        <ApplicantList
          formId={id}
          applicants={applicationData.formApplications ?? []}
        />
      )}
      <Link
        href={`/apply/${id}/edit`}
        className="fixed right-5 bottom-10 flex h-12 items-center justify-center rounded-[100px] bg-blue-500 px-8 py-3 font-semibold text-white hover:bg-blue-600 md:right-20 md:bottom-20 md:px-10 md:py-4"
      >
        지원서 양식 관리
      </Link>
    </>
  );
}
