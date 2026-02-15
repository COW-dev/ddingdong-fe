'use client';

import { useState } from 'react';

import {
  Body2,
  Button,
  Caption1,
  FileUpload,
  Flex,
  Input,
  Select,
} from 'ddingdong-design-system';

import { departmentInfo } from '@/constants/department';

import { Caption2, Title1 } from '../ui/EventTypography';

const departments = Object.values(departmentInfo).flat();

type SubmitFormValues = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  membershipFeeReceiptFileIds: string[];
};

const INIT: SubmitFormValues = {
  name: '',
  studentNumber: '',
  department: '',
  phoneNumber: '',
  membershipFeeReceiptFileIds: [],
};

type Props = {
  onSubmit: (data: SubmitFormValues) => void;
};

export function SubmitStep({ onSubmit }: Props) {
  const [formData, setFormData] = useState<SubmitFormValues>(INIT);

  const handleChange = (key: keyof SubmitFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }) as SubmitFormValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.studentNumber ||
      !formData.department ||
      !formData.phoneNumber
    ) {
      return;
    }
    onSubmit(formData);
  };

  return (
    <Flex
      dir="col"
      alignItems="center"
      gap={6}
      className="min-h-screen w-full bg-white px-4 py-8"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full flex-col gap-6"
      >
        <Flex
          dir="col"
          alignItems="center"
          gap={2}
          className="w-full text-center"
        >
          <Title1 weight="bold" className="text-game-primary">
            상품 응모하기
          </Title1>
          <Caption2 className="text-gray-700">
            마루가 준비한 선물을 전달하기 위해 정보를 입력해주세요
          </Caption2>
        </Flex>

        <Flex
          dir="col"
          gap={2}
          className="border-game-secondary bg-game-tertiary w-full rounded-lg border px-4 py-4 text-gray-700"
        >
          <Caption1>• 학생회비 납부자에 한해 응모가 가능해요</Caption1>
          <Caption1>• 모든 항목을 입력해야 응모가 완료돼요</Caption1>
          <Caption1>• 응모는 1인 1회만 가능해요</Caption1>
        </Flex>

        <Flex dir="col" gap={5} className="mb-3 w-full rounded-lg px-2 py-7">
          <Flex gap={3} className="flex-col flex-wrap">
            <Flex dir="col" gap={3} className="flex-1">
              <Caption1 weight="bold" className="text-gray-600">
                이름
              </Caption1>
              <Input
                placeholder="이름을 입력해 주세요."
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onClickReset={() => handleChange('name', '')}
                className="flex-1"
              />
            </Flex>

            <Flex dir="col" gap={3} className="flex-1">
              <Caption1 weight="bold" className="text-gray-600">
                학과
              </Caption1>
              <Select
                value={formData.department}
                onChange={(value) => handleChange('department', value)}
                defaultValue="학과를 선택해주세요."
                className="flex-1"
              >
                {departments.map((dept) => (
                  <Select.Option key={dept} name={dept} />
                ))}
              </Select>
            </Flex>
            <Flex dir="col" gap={3} className="flex-1">
              <Caption1 weight="bold" className="text-gray-600">
                학번
              </Caption1>
              <Input
                placeholder="학번을 입력해 주세요."
                value={formData.studentNumber}
                onChange={(e) => handleChange('studentNumber', e.target.value)}
                onClickReset={() => handleChange('studentNumber', '')}
                className="flex-1"
              />
            </Flex>
          </Flex>

          <Flex gap={3} className="flex-col md:flex-row md:flex-nowrap">
            <Flex dir="col" gap={3} className="flex-1">
              <Caption1 weight="bold" className="text-gray-600">
                전화번호
              </Caption1>
              <Input
                placeholder="전화번호를 입력해 주세요. ex) 010-1234-5678"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                onClickReset={() => handleChange('phoneNumber', '')}
                className="flex-1"
              />
            </Flex>
            <Flex dir="col" gap={3} className="flex-1">
              <Caption1 weight="bold" className="text-gray-600">
                학생회비 납부 내역 첨부
              </Caption1>
              <FileUpload
                mode="single"
                onChange={function Xs() {}}
                placeholder="파일을 업로드해주세요"
              />
            </Flex>
          </Flex>
        </Flex>

        <Button
          type="submit"
          variant="primary"
          size="full"
          className="bg-game-primary py-3"
        >
          <Body2 weight="bold">응모하기</Body2>
        </Button>
      </form>
    </Flex>
  );
}
