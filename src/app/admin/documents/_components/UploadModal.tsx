import {
  Body2,
  Body3,
  Button,
  DoubleButton,
  FileUpload,
  Flex,
  IconButton,
  Input,
  Modal,
  Title3,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { useAddDocument } from '@/app/_api/mutations/document';
import { Loading } from '@/components/loading/Loading';

import { useDocument } from '../_hooks/useDocument';

type UploadModalProps = {
  isOpen: boolean;
  closeModal: VoidFunction;
};

export function UploadModal({ isOpen, closeModal }: UploadModalProps) {
  const {
    title,
    files,
    isLoading,
    fileIds,
    resetTitle,
    resetAll,
    handleChangeTitle,
    handleDeleteFile,
    handleChangeFiles,
  } = useDocument();

  const mutation = useAddDocument();

  const handleDocumentUpload = () => {
    if (title.trim() === '' || fileIds.length === 0) {
      toast.error('제목과 파일을 모두 입력해주세요.');
      return;
    }

    mutation.mutate(
      { title, fileIds },
      {
        onSuccess: () => {
          closeModal();
          resetAll();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[480px]">
        <Title3>자료실 업로드</Title3>
        <div className="h-[1.5px] bg-gray-200" />
        <Input
          value={title}
          onChange={handleChangeTitle}
          onClickReset={resetTitle}
          type="text"
          placeholder="제목을 입력해주세요."
        />
        <FileUpload mode="multiple" onChange={handleChangeFiles} />
        {isLoading && (
          <Flex justifyContent="center" className="w-full">
            <Loading />
          </Flex>
        )}
        {!isLoading && files.length > 0 && (
          <Flex dir="col" gap={2} className="ml-2">
            {files.map((item) => (
              <Flex
                key={item.name}
                alignItems="center"
                justifyContent="between"
              >
                <Body3 className="text-gray-500">{item.name}</Body3>
                <IconButton
                  iconName="close"
                  size={16}
                  color="gray"
                  onClick={() => handleDeleteFile(item.name)}
                />
              </Flex>
            ))}
          </Flex>
        )}
        <DoubleButton
          left={
            <Button
              variant="tertiary"
              size="full"
              onClick={() => {
                closeModal();
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
              onClick={handleDocumentUpload}
              disabled={isLoading}
            >
              <Body2 weight="semibold">업로드</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
