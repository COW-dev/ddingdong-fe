import { PropsWithChildren } from 'react';

import { Body1, Body2, Body3, Flex } from 'ddingdong-design-system';

import { Answer } from '@/app/_api/types/apply';
import { getApplicantInfo } from '@/app/admin/apply/[id]/_constants/apply';

type Props = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
  formFieldAnswers: Answer[];
};

export function ApplicantInfo({ ...props }: Props) {
  const { formFieldAnswers } = props;
  const section = formFieldAnswers.find((answer) => answer.section !== '공통');
  const info = getApplicantInfo(props);

  return (
    <div className="mt-2">
      <Body3
        as="span"
        weight="semibold"
        className="ml-3 w-[70px] rounded-md rounded-b-none bg-blue-50 px-2.5 py-1 text-blue-500"
      >
        {section ? section.section : '공통'}
      </Body3>
      <ApplyContentContainer>
        {info.map(({ label, value }) => (
          <Flex
            key={label}
            dir="row"
            justifyContent="start"
            alignItems="start"
            gap={5}
            className="md:mr-6 md:flex-col md:gap-3"
          >
            <Body1 weight="bold" className="text-blue-500">
              {label}
            </Body1>
            <Body2 weight="medium" className="text-gray-600">
              {value}
            </Body2>
          </Flex>
        ))}
      </ApplyContentContainer>
    </div>
  );
}

export function ApplyContentContainer({ children }: PropsWithChildren) {
  return (
    <Flex
      justifyContent="start"
      alignItems="start"
      className="box-border h-full w-full flex-col rounded-[10px] bg-blue-50 px-5 py-8 md:flex-row md:px-16"
    >
      {children}
    </Flex>
  );
}
