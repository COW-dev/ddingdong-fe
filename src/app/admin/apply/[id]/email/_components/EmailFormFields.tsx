import { Flex, Input, Select, TextArea } from 'ddingdong-design-system';

import {
  EMAIL_OPTIONS,
  EMAIL_STATUS,
} from '@/app/admin/apply/[id]/_constants/apply';

type EmailFormFieldsProps = {
  target: string;
  title: string;
  message: string;
  onTargetChange: (value: typeof EMAIL_STATUS.FIRST_PASS) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleReset: () => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function EmailFormFields({
  target,
  title,
  message,
  onTargetChange,
  onTitleChange,
  onTitleReset,
  onMessageChange,
}: EmailFormFieldsProps) {
  return (
    <>
      <Flex className="mt-4 w-fit">
        <Select
          size="md"
          value={target}
          defaultValue={EMAIL_STATUS.FIRST_PASS}
          onChange={(value) =>
            onTargetChange(value as typeof EMAIL_STATUS.FIRST_PASS)
          }
        >
          {EMAIL_OPTIONS.map((item) => (
            <Select.Option key={item} name={item} />
          ))}
        </Select>
      </Flex>
      <Input
        value={title}
        onChange={onTitleChange}
        onClickReset={onTitleReset}
        placeholder="이메일 제목을 입력해 주세요."
        className="w-full"
      />
      <TextArea
        name="content"
        rows={10}
        value={message}
        onChange={onMessageChange}
        placeholder="전송할 내용을 입력해 주세요."
        className="w-full resize-none md:text-lg"
      />
    </>
  );
}
