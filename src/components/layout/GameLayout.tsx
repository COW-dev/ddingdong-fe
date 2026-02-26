'use client';

import Link from 'next/link';

import { Flex, Header } from 'ddingdong-design-system';

import { OptimizedImage } from '../common/OptimizedImage';

type GameLayoutProps = {
  children: React.ReactNode;
};

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <Flex
      as="main"
      dir="col"
      alignItems="center"
      justifyContent="center"
      className="min-h-screen w-full bg-[var(--game-layout-bg)] text-gray-800"
    >
      <Header className="z-25 flex border-b-0 bg-[var(--game-layout-bg)]">
        <Flex
          dir="row"
          alignItems="center"
          justifyContent="start"
          className="w-full"
        >
          <Link href="/" className="inline-block">
            <OptimizedImage
              src="/logo.webp"
              width={1344}
              height={380}
              fetchPriority="high"
              alt="ddingdong"
              className="w-34 md:w-38"
            />
          </Link>
        </Flex>
      </Header>
      <Flex dir="col" className="w-full max-w-6xl px-6 md:px-16 md:pt-26">
        {children}
      </Flex>
    </Flex>
  );
}
