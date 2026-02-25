'use client';

import {
  Body2,
  Button,
  Caption1,
  FileUpload,
  Flex,
  IconButton,
  Input,
  Select,
  Title1,
} from 'ddingdong-design-system';

import { departmentInfo } from '@/constants/department';

import { useGameLayoutBg } from '../../_hooks/useGameLayoutBg';
import {
  usePairGameSubmit,
  type SubmitFormValues,
} from '../../_hooks/usePairGameSubmit';

const departments = Object.values(departmentInfo).flat();

type Props = {
  onSubmit: (data: SubmitFormValues) => void;
};

export function SubmitStep({ onSubmit }: Props) {
  const {
    formData,
    receiptFile,
    isPending,
    isFormComplete,
    handleChange,
    handleFileChange,
    clearReceiptFile,
    handleSubmit,
  } = usePairGameSubmit(onSubmit);

  useGameLayoutBg();

  return (
    <Flex
      dir="col"
      alignItems="center"
      gap={6}
      className="min-h-screen w-full pt-24 pb-10"
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
          <Title1
            weight="bold"
            className="font-school-safety text-game-primary"
          >
            상품 응모하기
          </Title1>
          <Caption1
            className="font-school-safety text-gray-700"
            weight="normal"
          >
            마루가 준비한 선물을 전달하기 위해 정보를 입력해주세요
          </Caption1>
        </Flex>

        <Flex
          dir="col"
          gap={2}
          className="border-game-secondary bg-game-tertiary rounded-lg border px-4 py-3 text-gray-700"
        >
          <Caption1>• 학생회비 납부자에 한해 응모가 가능해요</Caption1>
          <Caption1>• 모든 항목을 입력해야 응모가 완료돼요</Caption1>
          <Caption1>• 응모는 1인 1회만 가능해요</Caption1>
        </Flex>

        <Flex dir="col" gap={5} className="mb-3 w-full rounded-lg px-2 pb-7">
          <Flex gap={3} className="flex-col flex-wrap">
            <Flex dir="col" gap={3} className="flex-1">
              <Caption1 weight="bold" className="text-gray-600">
                이름
              </Caption1>
              <Input
                placeholder="이름을 입력해 주세요"
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
                defaultValue="학과를 선택해주세요"
                className="flex-1"
              >
                {departments.map((dept) => (
                  <Select.Option key={dept} name={dept} />
                ))}
              </Select>
            </Flex>
            <Flex dir="col" gap={3} className="flex-1">
              <Caption1 weight="bold" className="text-gray-600">
                학번 (예시:60123456)
              </Caption1>
              <Input
                placeholder="학번을 입력해 주세요"
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
                전화번호 (예시 : 010-1234-5678)
              </Caption1>
              <Input
                placeholder="전화번호를 입력해 주세요"
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
                onChange={handleFileChange}
                placeholder="파일을 선택해주세요"
              />
              {receiptFile && (
                <Flex
                  dir="row"
                  alignItems="center"
                  justifyContent="between"
                  gap={2}
                  className="w-full pl-2"
                >
                  <Caption1 className="truncate text-gray-500">
                    {receiptFile.name}
                  </Caption1>
                  <IconButton
                    iconName="close"
                    size={16}
                    color="gray"
                    onClick={clearReceiptFile}
                  />
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>

        <div className="fixed right-0 bottom-3 left-0 px-4">
          <div className="mx-auto w-full max-w-md">
            <Button
              type="submit"
              variant={!isFormComplete || isPending ? 'tertiary' : 'primary'}
              size="full"
              isLoading={isPending}
              disabled={!isFormComplete || isPending}
              className={`py-3 ${
                !isFormComplete || isPending ? '' : 'bg-game-primary'
              }`}
            >
              <Body2 weight="bold">응모하기</Body2>
            </Button>
          </div>
        </div>
      </form>
    </Flex>
  );
}
