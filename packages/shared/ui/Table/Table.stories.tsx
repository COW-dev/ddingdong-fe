import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const PrimitiveMeta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '기본적인 Table 레이아웃 구성 요소 세트입니다.  ',
      },
    },
  },
} satisfies Meta<typeof Table>;
export default PrimitiveMeta;

const data = [
  {
    scoreCategory: '동아리 활동 보고서',
    reason: '2회차 활동보고서',
    amount: 4.615,
    createdAt: '2025-03-31 15:42:26',
  },
  {
    scoreCategory: '동아리 활동 보고서',
    reason: '2회차 활동보고서',
    amount: 0.001,
    createdAt: '2025-03-31 16:02:31',
  },
  {
    scoreCategory: '전동대회',
    reason: '3월 전동대회 참여',
    amount: 1.0,
    createdAt: '2025-04-01 11:40:36',
  },
  {
    scoreCategory: '전동대회',
    reason: '4월 전동대회 참여',
    amount: 1.0,
    createdAt: '2025-04-28 19:44:04',
  },
  {
    scoreCategory: '동아리 활동 보고서',
    reason: '3회차 활동보고서',
    amount: 4.615,
    createdAt: '2025-04-30 14:56:26',
  },
];

export const Basic: StoryObj<typeof PrimitiveMeta> = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>날짜</TableHead>
          <TableHead>카테고리</TableHead>
          <TableHead>점수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.createdAt}</TableCell>
            <TableCell>{row.scoreCategory}</TableCell>
            <TableCell>{row.amount.toFixed(3)}점</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
