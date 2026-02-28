import { useParams, useRouter } from 'next/navigation';

import {
  Body2,
  Button,
  Caption1,
  DoubleButton,
  Flex,
  Modal,
} from 'ddingdong-design-system';
import toast from 'react-hot-toast';

import { useReSendEmail } from '@/app/_api/mutations/email';
import { EmailSendAPIResponse } from '@/app/_api/types/email';

type ReSendModalProps = {
  isOpen: boolean;
  onClose: () => void;
  reSendLength: number;
};

export function ReSendModal({
  isOpen,
  onClose,
  reSendLength,
}: ReSendModalProps) {
  const router = useRouter();
  const { mutate: reSendEmail } = useReSendEmail();
  const { id, status } = useParams();

  const handleResend = () => {
    reSendEmail(
      {
        formId: Number(id),
        target: String(status).toUpperCase(),
      },
      {
        onSuccess: (data: EmailSendAPIResponse) => {
          router.push(
            `/apply/${id}/email/deliveries?status=in-progress&historyId=${data?.formEmailSendHistoryId}`,
          );
          onClose();
        },
        onError: () => {
          toast.error('재전송에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <Flex
        dir="col"
        alignItems="center"
        justifyContent="center"
        className="w-full"
      >
        <Body2>총 {reSendLength}건을 재전송하시겠습니까?</Body2>
        <Caption1 className="text-gray-400">
          ‘영구 실패’ 지원자는 전송되지 않습니다.
        </Caption1>
        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={onClose}>
              취소
            </Button>
          }
          right={
            <Button
              variant="primary"
              size="full"
              color="blue"
              onClick={handleResend}
            >
              전송하기
            </Button>
          }
          className="mt-5"
        />
      </Flex>
    </Modal>
  );
}
