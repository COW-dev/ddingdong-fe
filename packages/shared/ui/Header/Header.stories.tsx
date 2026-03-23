import { Flex } from '../Flex';

import { Header } from './Header';
import { Menu } from './Menu';
import { MenuContainer } from './MenuContext';
import { MenuItem } from './MenuItem';
import { MenuTrigger } from './MenuTrigger';
import { NavigationItem } from './NavigationItem';

import type { Meta, StoryObj } from '@storybook/react';

const navItems = {
  총동아리연합회: [
    { id: 1, href: '/notice', content: '공지사항' },
    { id: 2, href: '/documents', content: '자료실' },
    { id: 3, href: '/faq', content: 'FAQ' },
  ],
  동아리피드: [{ id: 4, href: '/feeds', content: '피드' }],
  SNS: [
    { id: 5, href: 'https://pf.kakao.com/_ExmtkG', content: '카카오톡' },
    {
      id: 6,
      href: 'https://www.instagram.com/mju_club_',
      content: '인스타그램',
    },
  ],
};

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '170px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Header 컴포넌트는 로고 및 탐색(Navigation) 메뉴와 같은 주요 요소를 담는 상단 컨테이너입니다.',
      },
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const Basic: Story = {
  args: {
    children: (
      <a href="https://ddingdong.mju.ac.kr/">
        <img
          src="https://ddingdong.mju.ac.kr/_next/image?url=%2Flogo.png&w=3840&q=75"
          width="120"
          alt="LOGO"
        />
      </a>
    ),
  },
};

export const WithNavigation: Story = {
  args: {
    children: (
      <Flex dir="row" alignItems="center" className="w-full">
        <a href="https://ddingdong.mju.ac.kr/">
          <img
            src="https://ddingdong.mju.ac.kr/_next/image?url=%2Flogo.png&w=3840&q=75"
            width="150"
            alt="LOGO"
          />
        </a>
        <Flex dir="row" alignItems="center" justifyContent="between" className="h-full w-full pl-6">
          <Flex dir="row" alignItems="center" className="ml-auto gap-4">
            {Object.entries(navItems).map(([category, items]) => {
              if (items.length === 1) {
                const item = items[0];
                return (
                  <NavigationItem key={category} href={item.href}>
                    {category}
                  </NavigationItem>
                );
              }
              return (
                <MenuContainer key={category}>
                  <MenuTrigger>{category}</MenuTrigger>
                  <Menu>
                    {items.map((item) => {
                      const isExternal = /^https?:\/\//.test(item.href);
                      return (
                        <MenuItem
                          key={item.id}
                          href={item.href}
                          target={isExternal ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                        >
                          {item.content}
                        </MenuItem>
                      );
                    })}
                  </Menu>
                </MenuContainer>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    ),
  },
};
