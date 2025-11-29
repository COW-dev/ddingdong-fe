import Image from 'next/image';
import Link from 'next/link';

import {
  Accordion,
  AccordionItem as Item,
  Flex,
  NavigationItem,
  MenuContainer,
  Menu,
  MenuTrigger,
  MenuItem,
} from 'ddingdong-design-system';

import { navItems } from '@/constants/navItems';

type Props = {
  onItemClick?: () => void;
  isMobile?: boolean;
};

export function NavigationItems({ onItemClick, isMobile = false }: Props) {
  const entries = Object.entries(navItems).filter(
    ([, items]) => (items?.length ?? 0) > 0,
  ) as [
    string,
    { id: string | number; href: string; content?: string; image?: string }[],
  ][];

  if (isMobile) {
    return (
      <Flex dir="col" alignItems="start" justifyContent="center">
        {entries.map(([category, items]) => {
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
      {entries.map(([category, items]) => {
        if (items.length === 1) {
          const item = items[0];
          return (
            <NavigationItem
              key={category}
              href={item.href}
              onClick={onItemClick}
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
  );
}
