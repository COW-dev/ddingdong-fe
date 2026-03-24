import { useState } from 'react';

import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { Caption1 } from '../Typography';

import { FileUpload, FileUploadProps } from './FileUpload';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;

export type Story = StoryObj<FileUploadProps>;
export const Single: Story = {
  args: {
    mode: 'single',
    placeholder: '파일을 업로드해주세요',
  },
  argTypes: {
    mode: {
      control: false,
      options: ['single', 'multiple'],
      table: {
        type: { summary: 'single | multiple' },
        defaultValue: { summary: 'single' },
      },
    },
  },
  render: (args) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0] ?? null;
      setFile(selectedFile);
      event.target.value = '';
    };

    const resetFile = () => {
      setFile(null);
    };

    return (
      <Flex dir="col" gap={4}>
        <FileUpload {...args} onChange={handleFileUpload} />
        <Flex>
          {file && (
            <Flex alignItems="center" gap={2} className="h-auto w-full">
              <Caption1 weight="medium">{file.name}</Caption1>
              <IconButton iconName="close" size={15} onClick={resetFile} />
            </Flex>
          )}
        </Flex>
      </Flex>
    );
  },
};

export const Multiple: Story = {
  args: {
    mode: 'multiple',
    placeholder: '파일 여러개를 선택해주세요',
  },

  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files || []);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      event.target.value = '';
    };

    const resetFile = (removeFile: File) => {
      setFiles((prevFiles) => prevFiles.filter((file) => file !== removeFile));
    };

    return (
      <Flex dir="col" gap={4}>
        <FileUpload onChange={handleFileUpload} {...args} />
        <Flex dir="col" gap={2}>
          {files.map((file, index) => (
            <Flex
              alignItems="center"
              gap={2}
              className="h-auto w-full"
              key={`${file.name}-${index}`}
            >
              <Caption1 weight="medium">{file.name}</Caption1>
              <IconButton iconName="close" size={15} onClick={() => resetFile(file)} />
            </Flex>
          ))}
        </Flex>
      </Flex>
    );
  },
};
