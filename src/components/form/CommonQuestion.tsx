import React, { useState } from 'react';
import BaseInput from './BaseInput';
import { StepDropdown } from './StepDropdown';

export default function CommonQuestion() {
  const stepItem = {
    ICT융합대학: [
      '디지털콘텐츠디자인학과',
      '융합소프트웨어학부',
      '정보통신공학과',
    ],
    미래융합대학: [
      '창의융합인재학부',
      '사회복지학과',
      '부동산학과',
      '법무행정학과',
      '심리치료학과',
      '미래융합경영학과',
      '멀티디자인학과',
      '회계세무학과',
      '계약학과',
    ],
    자연과학대학: [
      '수학과',
      '물리학과',
      '화학과',
      '식품영양학과',
      '생명과학정보학과',
    ],
    공과대학: [
      '전기공학과',
      '전자공학과',
      '반도체공학과',
      '화학공학과',
      '신소재공학과',
      '환경에너지공학과',
      '컴퓨터공학과',
      '토목환경공학과',
      '교통공학과',
      '기계공학과',
      '산업경영공학과',
      '공학교육혁신센터',
    ],
    예술체육대학: ['디자인학부', '스포츠학부', '바둑학과', '예술학부'],
    건축대학: ['건축학부'],
    방목기초교육대학: [
      '전공자유학부(인문)',
      '전공자유학부(자연)',
      '융합전공학부(인문)',
    ],
    국제학부: ['글로벌비즈니스전공'],
  };

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-lg border border-gray-200 px-10 py-4 ">
      <div className="flex flex-row gap-2">
        <BaseInput placeholder="이름을 입력해주세요" />
        <BaseInput placeholder="학번을 입력해주세요" />
        <StepDropdown contents={stepItem} />
      </div>

      <div className="flex gap-3">
        <BaseInput placeholder="전화번호를 입력해주세요" />
        <BaseInput placeholder="이메일을 입력해주세요" />
      </div>
      <div className="w-full border-t border-gray-200 pt-2 text-right font-semibold text-gray-400">
        * 해당 질문은 기본제공 질문입니다
      </div>
    </div>
  );
}
