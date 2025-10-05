import Image from 'next/image';
import Link from 'next/link';

import {
  Accordion,
  AccordionItem as Item,
  Flex,
} from 'ddingdong-design-system';

import { navItems } from '@/constants/navItems';

import {
  NavigationItem,
  MenuContainer,
  Menu,
  MenuTrigger,
  MenuItem,
} from './Header';

type Props = {
  onItemClick?: () => void;
  isMobile?: boolean;
};

export function NavigationItems({ onItemClick, isMobile = false }: Props) {
  if (isMobile) {
    return (
      <Flex dir="col" alignItems="start" justifyContent="center">
        {Object.entries(navItems).map(([category, items]) => {
          if (!items || items.length === 0) return null;

          if (items.length === 1) {
            const item = items[0];
            const isExternal = /^https?:\/\//.test(item.href);
            return (
              <Flex
                key={category}
                dir="col"
                className="w-full border-b border-gray-200 px-2 py-4 hover:bg-gray-50"
              >
                <Link
                  href={item.href}
                  onClick={onItemClick}
                  className="w-full px-4 font-semibold"
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {category}
                </Link>
              </Flex>
            );
          }

          return (
            <Accordion key={category} type="multiple" className="w-full">
              <Item
                value={`item-${category}`}
                trigger={<div className="w-full font-semibold">{category}</div>}
              >
                <Flex as="ul" dir="col" className="list-none space-y-4">
                  {items.map((item) => {
                    const isExternal = /^https?:\/\//.test(item.href);
                    return (
                      <Flex as="li" key={item.id} className="flex-grow">
                        <Link
                          href={item.href}
                          onClick={onItemClick}
                          className="text-md flex items-center font-semibold text-gray-500 hover:text-blue-500"
                          {...(isExternal
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {item.image && (
                            <Image
                              src={item.image}
                              width={24}
                              height={24}
                              alt="icon"
                              className="mr-2"
                            />
                          )}
                          {item.content ?? category}
                        </Link>
                      </Flex>
                    );
                  })}
                </Flex>
              </Item>
            </Accordion>
          );
        })}
      </Flex>
    );
  }

  return (
    <Flex dir="row" alignItems="center" className="ml-auto gap-4">
      {Object.entries(navItems).map(([category, items]) => {
        if (items.length === 1) {
          const item = items[0];
          const isExternal = /^https?:\/\//.test(item.href);
          return (
            <NavigationItem
              key={category}
              href={item.href}
              onClick={onItemClick}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
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
                    onClick={onItemClick}
                    {...(isExternal
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
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
  );
}
