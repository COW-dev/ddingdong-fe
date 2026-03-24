import { Fragment, useState } from 'react';

import { GroupingSelect, Select } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Select 컴포넌트는 드롭다운 메뉴를 통해 여러 옵션 중 하나를 선택할 수 있는 UI 요소입니다. 사용자는 버튼을 클릭하여 옵션 목록을 열고, 원하는 옵션을 선택할 수 있습니다. 선택된 옵션은 버튼에 표시되며, 사용자는 언제든지 다른 옵션으로 변경할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const defaultContents = ['객관식', '단답형', '체크박스', '드롭다운', '파일'];

export const Basic: Story = {
  args: {
    value: '유형을 선택해주세요',
    size: 'md',
    defaultValue: '유형을 선택해주세요',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['md', 'lg'],
      description: 'Select 컴포넌트의 크기 옵션입니다.',
    },
    defaultValue: {
      control: 'text',
      description: '기본 선택값입니다.',
    },
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue);
    return (
      <div className="h-50">
        <Select {...args} value={value} onChange={setValue}>
          {defaultContents.map((item, index) => (
            <Select.Option key={index} name={item} />
          ))}
        </Select>
      </div>
    );
  },
};

export const LargeSize: Story = {
  args: {
    value: '유형을 선택해주세요',
    size: 'lg',
    defaultValue: '유형을 선택해주세요',
  },
  parameters: {
    docs: {
      description: {
        story: '`lg` 사이즈가 적용된 Select 컴포넌트입니다.',
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue);
    return (
      <div className="h-62">
        <Select {...args} value={value} onChange={setValue}>
          {defaultContents.map((item, index) => (
            <Select.Option key={index} name={item} />
          ))}
        </Select>
      </div>
    );
  },
};

const groupingContents = {
  ICT융합대학: ['디지털콘텐츠디자인학과', '융합소프트웨어학부', '정보통신공학과'],
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
  자연과학대학: ['수학과', '물리학과', '화학과', '식품영양학과', '생명과학정보학과'],
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
  방목기초교육대학: ['전공자유학부(인문)', '전공자유학부(자연)', '융합전공학부(인문)'],
  국제학부: ['글로벌비즈니스전공'],
};

export const Grouping: StoryObj<typeof GroupingSelect> = {
  args: {
    defaultValue: '학과를 선택해주세요',
  },
  parameters: {
    controls: { exclude: ['size'] },
    docs: {
      description: {
        story: '그룹화된 옵션을 제공하는 Select 컴포넌트입니다.',
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState(args.defaultValue);

    return (
      <div className="h-62">
        <GroupingSelect {...args} value={value} onChange={setValue}>
          {Object.entries(groupingContents).map(([group, departments]) => (
            <Fragment key={group}>
              <GroupingSelect.Group name={group} />
              {departments.map((dept, idx) => (
                <GroupingSelect.Option key={`${group}-${idx}`} name={dept} />
              ))}
            </Fragment>
          ))}
        </GroupingSelect>
      </div>
    );
  },
};
