import {
  Body2,
  Body3,
  Button,
  DoubleButton,
  Flex,
  MediaUpload,
  Modal,
} from 'ddingdong-design-system';

import { useBanner } from '../_hooks/useBanner';

export function UploadModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: VoidFunction;
}) {
  const {
    webPreviewUrl,
    mobilePreviewUrl,
    handleChangeMobile,
    handleChangeWeb,
    handleSubmit,
  } = useBanner();

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Flex dir="col" gap={4}>
        <Body3 as="label" className="font-semibold text-gray-500">
          ‘웹 배너’ 파일을 업로드 해주세요.
          <MediaUpload
            previewUrls={webPreviewUrl}
            onFileChange={handleChangeWeb}
            description="1032X200(px) 규격을 권장해요."
          />
        </Body3>
        <Body3 as="label" className="font-semibold text-gray-500">
          ‘모바일 배너’ 파일을 업로드 해주세요.
          <MediaUpload
            previewUrls={mobilePreviewUrl}
            onFileChange={handleChangeMobile}
            description="342X225(px) 규격을 권장해요."
          />
        </Body3>
        <DoubleButton
          left={
            <Button variant="tertiary" size="full" onClick={closeModal}>
              <Body2>닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              size="full"
              onClick={handleSubmit}
            >
              <Body2 weight="semibold"> 업로드하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}
