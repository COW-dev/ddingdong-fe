'use client';

import type { ChangeEvent } from 'react';

import { Body2, Checkbox, Flex, Input, TextArea } from '@dds/shared';

import { AdminCalendarField } from '@/admin/_components/AdminCalendarField';

import type { FormBasicInfo } from '../_hooks/useFormBasicInfo';

type FormHeaderSectionProps = {
  basicInfo: FormBasicInfo;
  onBasicInfoChange: (updates: Partial<FormBasicInfo>) => void;
  readOnly?: boolean;
  recruitPeriodReadOnly?: boolean;
  lockedRecruitStartDate?: Date | null;
};

export function FormHeaderSection({
  basicInfo,
  onBasicInfoChange,
  readOnly = false,
  recruitPeriodReadOnly = readOnly,
  lockedRecruitStartDate = null,
}: FormHeaderSectionProps) {
  const { title, description, recruitPeriod, hasInterview } = basicInfo;
  return (
    <Flex dir="col" gap={4}>
      <Flex
        dir="row"
        alignItems="center"
        justifyContent="end"
        gap={2}
        className="pt-10"
      >
        <label
          htmlFor="no-interview-checkbox"
          className="flex cursor-pointer items-center gap-2"
        >
          <Checkbox
            checked={!hasInterview}
            onCheckedChange={(checked) =>
              onBasicInfoChange({ hasInterview: !checked })
            }
            id="no-interview-checkbox"
            disabled={readOnly}
          />
          <Body2 weight="semibold" className="text-gray-500">
            우리동아리는 면접을 보지 않아요!
          </Body2>
        </label>
      </Flex>

      <Flex dir="col" gap={4}>
        <Flex dir="row" gap={3} className="flex-wrap md:flex-nowrap">
          <Input
            value={title}
            placeholder="지원서 제목을 입력해주세요"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onBasicInfoChange({ title: e.target.value })
            }
            onClickReset={() => onBasicInfoChange({ title: '' })}
            className="flex-1"
            disabled={readOnly}
          />
          <AdminCalendarField
            mode="range"
            value={recruitPeriod}
            onChange={(value) =>
              onBasicInfoChange({
                recruitPeriod: value,
              })
            }
            minDate={new Date(new Date().getFullYear(), 0, 1)}
            maxDate={new Date(new Date().getFullYear(), 11, 31)}
            placeholder="모집 기간을 선택해주세요"
            ariaLabel={
              lockedRecruitStartDate ? '모집 마감 날짜 선택' : '모집 기간 선택'
            }
            disabled={recruitPeriodReadOnly}
            lockedStartDate={lockedRecruitStartDate}
          />
        </Flex>

        <TextArea
          value={description}
          placeholder="지원서 설명을 입력해 주세요 (최대 255자 이내)"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onBasicInfoChange({ description: e.target.value })
          }
          disabled={readOnly}
        />
      </Flex>
    </Flex>
  );
}
