'use client';
import { useFix } from '../_hooks/useFix';
import { useRouter } from 'next/navigation';
import {
  Body2,
  Button,
  Card,
  DoubleButton,
  Flex,
  Input,
  MediaUpload,
  TextArea,
  Title1,
} from 'ddingdong-design-system';

export default function FixNewClientPage() {
  const router = useRouter();
  const {
    post,
    images,
    isLoading,
    handleSubmit,
    handleChange,
    handleClickImageUpload,
  } = useFix();

  return (
    <>
      <Title1 as="h1" weight="bold" className="py-7 md:py-10">
        동아리방 시설보수 신청
      </Title1>
      <Card className="flex flex-col gap-4 hover:bg-white md:flex-row">
        <Flex justifyContent="end" gap={2} className="flex-1 flex-col">
          <Input
            value={post.title}
            onClickReset={() => {}}
            name="title"
            spellCheck={false}
            placeholder="[동아리명] 제목을 입력하세요."
            onChange={handleChange}
          />
          <TextArea
            value={post.content}
            name="content"
            spellCheck={false}
            rows={4}
            placeholder="내용을 입력하세요."
            onChange={handleChange}
          />
        </Flex>
        <div className="flex-1">
          <MediaUpload
            multiple
            key={images.map((img) => img.id).join(',')}
            previewUrls={images.map((image) => image.previewUrl)}
            previewFiles={images.map((image) => image.file)}
            onFileChange={(files: File[] | null, urls: string[]) => {
              handleClickImageUpload(files ?? [], urls);
            }}
          />
        </div>
      </Card>
      <DoubleButton
        className="m-auto w-fit p-6"
        left={
          <Button variant="tertiary" size="md" onClick={router.back}>
            <Body2 weight="bold">취소</Body2>
          </Button>
        }
        right={
          <Button
            variant="primary"
            color="blue"
            disabled={isLoading}
            size="lg"
            onClick={handleSubmit}
          >
            <Body2 weight="bold">신청하기</Body2>
          </Button>
        }
      />
    </>
  );
}
