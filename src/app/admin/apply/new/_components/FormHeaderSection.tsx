'use client';

import {
  Body2,
  Checkbox,
  Flex,
  Input,
  TextArea,
} from 'ddingdong-design-system';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

import { FormBasicInfo } from '../_hooks/useFormBasicInfo';

type FormHeaderSectionProps = {
  basicInfo: FormBasicInfo;
  onBasicInfoChange: (updates: Partial<FormBasicInfo>) => void;
  readOnly?: boolean;
  allowDateEdit?: boolean;
};

export function FormHeaderSection({
  basicInfo,
  onBasicInfoChange,
  readOnly = false,
  allowDateEdit = false,
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
            onChange={(e) => onBasicInfoChange({ title: e.target.value })}
            onClickReset={() => onBasicInfoChange({ title: '' })}
            className="flex-1"
            disabled={readOnly}
          />
          <div className="relative w-full min-w-[250px] shrink">
            <Datepicker
              value={recruitPeriod}
              onChange={(value: DateValueType) =>
                onBasicInfoChange({
                  recruitPeriod: value ?? { startDate: null, endDate: null },
                })
              }
              useRange={true}
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              inputClassName="w-full rounded-xl bg-white px-4 py-3.5 border border-gray-200 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 focus:outline-none"
              disabled={!allowDateEdit}
            />
          </div>
        </Flex>

        <TextArea
          value={description}
          placeholder="지원서 설명을 입력해 주세요 (최대 255자 이내)"
          onChange={(e) => onBasicInfoChange({ description: e.target.value })}
          disabled={readOnly}
        />
      </Flex>
    </Flex>
  );
}
