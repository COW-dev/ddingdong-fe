'use client';

import Link from 'next/link';

import { Caption1, Flex } from 'ddingdong-design-system';

export default function Footer() {
  return (
    <Flex
      as="footer"
      role="contentinfo"
      dir="row"
      justifyContent="center"
      alignItems="stretch"
      className="mt-14 w-full bg-gray-50 md:mt-20"
    >
      <Flex dir="col" className="w-full max-w-6xl px-6 py-8 md:px-16 md:py-10">
        <Link
          href="https://confusion-icebreaker-9cd.notion.site/ddingdong-fc1246aa999042ccb02e6d57d59d99f0?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
          className="text-xs font-semibold text-gray-500 hover:underline md:text-sm"
        >
          개인정보 처리방침
        </Link>

        <Caption1 className="mt-2 text-xs font-medium text-gray-500 md:text-sm">
          © ddingdong. All Rights Reserved
        </Caption1>

        <address className="mt-1 text-xs text-gray-400 not-italic md:text-sm">
          E-mail:{' '}
          <Link
            href="mailto:mju.ddingdong@gmail.com"
            className="hover:underline"
          >
            mju.ddingdong@gmail.com
          </Link>
        </address>
      </Flex>
    </Flex>
  );
}
