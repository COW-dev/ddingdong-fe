import { ComponentProps, useId } from 'react';

import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Body3 } from '../Typography';

export type FileUploadProps = {
  /**
   * The id of the file input.
   */
  id?: string;
  /**
   * The mode of the file upload.
   */
  mode: 'single' | 'multiple';
} & Omit<ComponentProps<'input'>, 'id' | 'multiple'>;

export function FileUpload({ id, mode, ...props }: FileUploadProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <label
      className="focus-within:bg-primary-50 block w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100 md:py-3.5"
      htmlFor={inputId}
    >
      <Flex alignItems="center">
        <Icon name="file" size={25} color="gray" />
        <Body3 className="text-gray-400" weight="medium">
          {props.placeholder ||
            (mode === 'single' ? '파일을 업로드해주세요' : '파일 여러개를 선택해주세요')}
        </Body3>
      </Flex>
      <input
        id={inputId}
        name="uploadFile"
        type="file"
        multiple={mode === 'multiple'}
        className="hidden"
        {...props}
      />
    </label>
  );
}
