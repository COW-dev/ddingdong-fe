'use client';

import { useRouter } from 'next/navigation';

import { Flex } from 'ddingdong-design-system';

import { useEmailForm } from './_hooks/useEmailForm';

import { EmailActionButtons } from './_components/EmailActionButtons';
import { EmailFormFields } from './_components/EmailFormFields';
import { EmailHeader } from './_components/EmailHeader';
import { useEmailSubmit } from './_hooks/useEmailSubmit';

export default function ApplyEmailPage() {
  const router = useRouter();
  const {
    title,
    target,
    message,
    handleChangeTitle,
    handleResetTitle,
    handleChangeTarget,
    handleChangeMessage,
  } = useEmailForm();
  const { handleSubmit, isSubmitting } = useEmailSubmit();

  return (
    <Flex
      dir="col"
      justifyContent="between"
      alignItems="stretch"
      className="box-border w-full gap-2 md:gap-4"
    >
      <EmailHeader />
      <EmailFormFields
        target={target}
        title={title}
        message={message}
        onTargetChange={handleChangeTarget}
        onTitleChange={handleChangeTitle}
        onTitleReset={handleResetTitle}
        onMessageChange={handleChangeMessage}
      />
      <EmailActionButtons
        onCancel={() => router.back()}
        onSubmit={() => handleSubmit(title, target, message)}
        isSubmitting={isSubmitting}
      />
    </Flex>
  );
}
