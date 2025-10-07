import {
  Body2,
  Body3,
  Button,
  DoubleButton,
  FileUpload,
  Flex,
  IconButton,
  Modal,
  Title3,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { useUploadMemberExcel } from '@/app/_api/mutations/member';

import { useMemberExcelFile } from '../_hooks/useMemberExcelFile';

type UploadModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const { mutate: uploadMutation, isPending } = useUploadMemberExcel();
  const { file, handleChangeFiles, handleDeleteFile, resetAll } =
    useMemberExcelFile();

  const handleDocumentUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    uploadMutation(formData, {
      onSuccess: () => {
        onClose();
        resetAll();
      },
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      },
    });
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[480px]">
        <Title3>동아리원 엑셀 업로드</Title3>
        <div className="h-[1.5px] bg-gray-200" />
        <Body3 className="text-center text-gray-500">
          {`동아리원 양식이 변경됨에 따라 \n[동아리원 다운받기] 후 해당 양식으로 업로드해주세요.`}
        </Body3>
        <FileUpload mode="single" onChange={handleChangeFiles} />

        {file && (
          <Flex dir="col" gap={2} className="ml-2">
            <Flex alignItems="center" justifyContent="between">
              <Body3 className="text-gray-500">{file.name}</Body3>
              <IconButton
                iconName="close"
                size={16}
                color="gray"
                onClick={handleDeleteFile}
              />
            </Flex>
          </Flex>
        )}
        <DoubleButton
          left={
            <Button
              variant="tertiary"
              size="full"
              onClick={() => {
                onClose();
                resetAll();
              }}
            >
              <Body2>닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              size="full"
              disabled={!file}
              onClick={handleDocumentUpload}
              isLoading={isPending}
            >
              <Body2 weight="semibold">업로드</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
