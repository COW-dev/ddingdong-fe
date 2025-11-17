'use client';

import { useState } from 'react';

import { Body2, Body3, Flex, Input, Select } from 'ddingdong-design-system';

import { departmentInfo } from '@/constants/department';

const departments = Object.values(departmentInfo).flat();

type CommonQuestionData = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
};

type CommonQuestionProps = {
  onChange: (updates: CommonQuestionData) => void;
};

export function CommonQuestion({ onChange }: CommonQuestionProps) {
  const [data, setData] = useState<CommonQuestionData>({
    name: '',
    studentNumber: '',
    department: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (field: keyof CommonQuestionData) => (value: string) => {
    setData((prev) => {
      const updated = { ...prev, [field]: value };
      onChange(updated);
      return updated;
    });
  };

  return (
    <Flex
      dir="col"
      gap={5}
      className="mb-3 rounded-lg border border-gray-200 px-6 py-7"
    >
      <Flex gap={3} className="flex-col flex-wrap md:flex-row md:flex-nowrap">
        <Flex dir="col" gap={3} className="flex-1">
          <Body2 weight="bold" className="text-lg text-blue-500 md:text-xl">
            이름
          </Body2>
          <Input
            placeholder="이름을 입력해 주세요."
            value={data.name}
            onChange={(e) => handleChange('name')(e.target.value)}
            onClickReset={() => handleChange('name')('')}
            className="flex-1"
          />
        </Flex>
        <Flex dir="col" gap={3} className="flex-1">
          <Body2 weight="bold" className="text-lg text-blue-500 md:text-xl">
            학번
          </Body2>
          <Input
            placeholder="학번을 입력해 주세요."
            value={data.studentNumber}
            onChange={(e) => handleChange('studentNumber')(e.target.value)}
            onClickReset={() => handleChange('studentNumber')('')}
            className="flex-1"
          />
        </Flex>
        <Flex dir="col" gap={3} className="flex-1">
          <Body2 weight="bold" className="text-lg text-blue-500 md:text-xl">
            학과
          </Body2>
          <Select
            value={data.department}
            onChange={(value) => handleChange('department')(value)}
            defaultValue="학과를 선택해주세요."
            className="flex-1"
          >
            {departments.map((dept) => (
              <Select.Option key={dept} name={dept} />
            ))}
          </Select>
        </Flex>
      </Flex>

      <Flex gap={3} className="flex-col md:flex-row md:flex-nowrap">
        <Flex dir="col" gap={3} className="flex-1">
          <Body2 weight="bold" className="text-lg text-blue-500 md:text-xl">
            전화번호
          </Body2>
          <Input
            placeholder="전화번호를 입력해 주세요."
            value={data.phoneNumber}
            onChange={(e) => handleChange('phoneNumber')(e.target.value)}
            onClickReset={() => handleChange('phoneNumber')('')}
            className="flex-1"
          />
        </Flex>
        <Flex dir="col" gap={3} className="flex-1">
          <Body2 weight="bold" className="text-lg text-blue-500 md:text-xl">
            이메일
          </Body2>
          <Input
            placeholder="이메일을 입력해 주세요."
            value={data.email}
            onChange={(e) => handleChange('email')(e.target.value)}
            onClickReset={() => handleChange('email')('')}
            className="flex-1"
          />
        </Flex>
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="end"
        className="w-full border-t border-gray-200 pt-6"
      >
        <Body3 weight="semibold" className="text-gray-400">
          * 인적 사항은 필수 질문입니다
        </Body3>
      </Flex>
    </Flex>
  );
}
