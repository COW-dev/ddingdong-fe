import Link from 'next/link';

import { Body2, Body3, Card, Flex, Title3 } from 'ddingdong-design-system';

import { Document } from '@/app/_api/types/document';
import { ROLE_TYPE } from '@/constants/role';

import { ROLE_DASHBOARD } from '../_constants/dashboard';

type DocumentCardProps = {
  role: string;
  documentData: Document[];
};

export function DocumentCard({ role, documentData }: DocumentCardProps) {
  if (role !== ROLE_TYPE.ROLE_CLUB) return null;

  return (
    <Card className="mt-4 hover:bg-transparent md:mt-8">
      <Flex justifyContent="between" alignItems="center">
        <Title3 as="h2" weight="bold">
          {ROLE_DASHBOARD[role].documents.title}
        </Title3>
        <Link
          href={ROLE_DASHBOARD[role].documents.route}
          className="-mr-1 inline-block p-1 text-sm font-semibold text-gray-400 md:text-base"
        >
          더 보기
        </Link>
      </Flex>
      <DocumentContainer>
        {documentData?.slice(0, 3).map((document) => (
          <DocumentWrapper key={document.id}>
            <Link
              href="/documents"
              className="inline-block w-full pt-3 pb-4 transition-opacity hover:opacity-50 md:pt-3.5 md:pb-4.5"
            >
              <Body2 className="line-clamp-1">{document.title}</Body2>
              <Body3 weight="medium" className="mt-0.5 mb-2 text-gray-400">
                {new Date(document.createdAt).toLocaleDateString('ko-KR')}
              </Body3>
            </Link>
          </DocumentWrapper>
        ))}
      </DocumentContainer>
    </Card>
  );
}

const DocumentContainer = ({ children }: { children: React.ReactNode }) => {
  return <ul className="mt-8 w-full md:mt-10">{children}</ul>;
};

const DocumentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <li className="mb-1 w-full border-b border-gray-200">{children}</li>;
};
