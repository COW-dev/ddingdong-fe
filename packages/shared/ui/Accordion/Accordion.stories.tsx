import { Input } from '../Input';

import { AccordionItem, Accordion } from '.';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Accordion> = {
  title: 'components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accordion 하위 컴포넌트로 AccordionItem이 존재합니다',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => {
    return (
      <Accordion type="single">
        {[...Array(3)].map((_, index) => (
          <AccordionItem value={`item-${index + 1}`} trigger={<div>질문 {index}</div>} key={index}>
            <div>내용 {index}</div>
          </AccordionItem>
        ))}
      </Accordion>
    );
  },
};

export const MultipleAccordion: Story = {
  render: () => {
    return (
      <Accordion type="multiple">
        <AccordionItem value="item-1" trigger={<div>질문 1</div>}>
          <div>내용</div>
        </AccordionItem>
        <AccordionItem value="item-2" trigger={<div>질문 2</div>}>
          <div>내용</div>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const NoneArrowAccordion: Story = {
  render: () => {
    return (
      <Accordion type="single">
        <AccordionItem value="item-1" isArrow={false} trigger={<div>질문 1</div>}>
          <div>내용</div>
        </AccordionItem>
        <AccordionItem value="item-2" isArrow={false} trigger={<div>질문 2</div>}>
          <div>내용</div>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const InputAccordion: Story = {
  render: () => {
    return (
      <Accordion type="single">
        <AccordionItem value="item-1" trigger={<Input onClickReset={() => {}} />}>
          <Input onClickReset={() => {}} />
        </AccordionItem>
      </Accordion>
    );
  },
};

export const DefaultValueAccordion: Story = {
  render: () => {
    return (
      <Accordion type="single" defaultValue={['item-2']}>
        <AccordionItem value="item-1" isArrow={false} trigger="defualtValue를 설정하지 않은 요소">
          초기 render시 조회되지 않아요
        </AccordionItem>
        <AccordionItem value="item-2" isArrow={false} trigger="defualtValue를 설정한 요소">
          초기 render시 조회돼요
        </AccordionItem>
      </Accordion>
    );
  },
};
export const IconSizeAccordion: Story = {
  render: () => {
    return (
      <Accordion type="single" iconSize={12}>
        <AccordionItem value="item-1" trigger={<div>사용자 입력값에 따라</div>}>
          <div>아이콘의 크기를 조절합니다.</div>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const IconAlignAccordion: Story = {
  render: () => {
    return (
      <Accordion type="multiple">
        <AccordionItem
          value="item-1"
          trigger={
            <div>
              <div>질문 1</div>
              <div>아이콘은 요소의 상단에 위치합니다</div>
            </div>
          }
          iconAlign="start"
        >
          <div>아이콘 정렬 top</div>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          trigger={
            <div>
              <div>질문 2</div>
              <div>아이콘은 요소의 가운데 위치합니다</div>
            </div>
          }
          iconAlign="center"
        >
          <div>아이콘 정렬 center</div>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          trigger={
            <div>
              <div>아이콘 정렬 bottom</div>
              <div>아이콘은 요소의 하단에 위치합니다</div>
            </div>
          }
          iconAlign="end"
        >
          <div>아이콘 정렬 bottom</div>
        </AccordionItem>
      </Accordion>
    );
  },
};
