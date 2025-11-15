'use client';

import { useParams } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Body3, Flex } from 'ddingdong-design-system';

import { applyQueryOptions } from '@/app/_api/queries/apply';
import ApplicantInfo from '@/app/admin/apply/[id]/[applicantId]/_components/ApplicantInfo';
import { ApplicantHeader } from '@/app/admin/apply/[id]/[applicantId]/_components/ApplicantHeader';
import { ApplicantNote } from '@/app/admin/apply/[id]/[applicantId]/_components/ApplicantNote';
import { ApplicantStatusButtons } from '@/app/admin/apply/[id]/[applicantId]/_components/ApplicantStatusButtons';
import { ApplyResult } from '@/app/admin/apply/[id]/[applicantId]/_components/ApplyResult';

import { useApplicantStatus } from '../_hooks/useApplicantStatus';
import { sortFormResponses } from '../_utils/sort';

import { useApplicantNote } from './_hooks/useApplicantNote';

export default function ApplicantDetailPage() {
  const { id, applicantId } = useParams();
  const formId = Number(id);
  const applicationId = Number(applicantId);
  const { data: applicantData } = useSuspenseQuery(
    applyQueryOptions.applicantDetail(formId, applicationId),
  );

  const { note, handleNoteChange, handleUpdateNote } = useApplicantNote(
    formId,
    applicationId,
    applicantData?.note || '',
  );

  const { handleUpdateStatus } = useApplicantStatus(
    formId,
    applicationId,
    applicantData?.status || '',
    applicantData?.hasInterview || false,
  );

  return (
    <Flex dir="col" gap={3} className="w-full">
      <ApplicantHeader
        name={applicantData.name}
        status={applicantData.status}
        submittedAt={applicantData.submittedAt}
      />
      <ApplicantInfo {...applicantData} />
      {sortFormResponses(applicantData.formFieldAnswers).map((answer) => (
        <ApplyResult key={answer.fieldId} {...answer} />
      ))}
      <ApplicantNote
        note={note}
        onNoteChange={handleNoteChange}
        onUpdateNote={handleUpdateNote}
      />
      <ApplicantStatusButtons
        onPass={() => handleUpdateStatus(true)}
        onFail={() => handleUpdateStatus(false)}
      />
    </Flex>
  );
}
