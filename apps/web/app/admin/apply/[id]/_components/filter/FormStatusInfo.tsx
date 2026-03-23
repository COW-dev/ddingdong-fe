import { Body2, Button, Flex, Title3, usePortal } from '@dds/shared';

import { FormStatus } from '@/_api/types/apply';
import { FORM_STATUS } from '@/admin/apply/[id]/_constants/apply';

import { formatDate } from '../../_utils/formatDate';
import { MemberIntegrationModal } from '../MemberIntergrationModal';

import { EmailSendDropdown } from './EmailSendDropdown';

type FormStatusInfoProps = {
  formStatus: FormStatus;
  startDate: string;
  endDate: string;
  hasInterview: boolean;
  onRegister: () => void;
  formId: number;
};

export function FormStatusInfo({
  formStatus,
  startDate,
  endDate,
  hasInterview,
  onRegister,
  formId,
}: FormStatusInfoProps) {
  const { isOpen, openModal, closeModal } = usePortal();
  return (
    <>
      <Flex
        dir="row"
        justifyContent="between"
        className={hasInterview ? 'mb-0 mt-12' : 'my-11'}
      >
        <Flex dir="col" alignItems="start" gap={1}>
          <Title3 weight="bold">
            <Title3
              as="span"
              weight="bold"
              className={
                FORM_STATUS[formStatus as keyof typeof FORM_STATUS]?.color
              }
            >
              {FORM_STATUS[formStatus as keyof typeof FORM_STATUS]?.text}
            </Title3>{' '}
            지원서입니다.
          </Title3>
          <Body2 weight="semibold" className="text-gray-500">
            {formatDate(startDate)} ~ {formatDate(endDate)}
          </Body2>
        </Flex>
        <Flex dir="row" alignItems="center" gap={3}>
          <Button
            size="sm"
            variant="tertiary"
            onClick={openModal}
            className="hidden md:block"
          >
            합격자 명단 연동
          </Button>
          <EmailSendDropdown formId={formId} />
        </Flex>
      </Flex>
      <MemberIntegrationModal
        isOpen={isOpen}
        onClose={closeModal}
        onIntegration={onRegister}
      />
    </>
  );
}
