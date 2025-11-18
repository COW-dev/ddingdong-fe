'use client';

import { ReactNode, Suspense } from 'react';

import { TabItem, Tabs } from 'ddingdong-design-system';

import { TabContainer } from '../_containers/TabContainer';

import { ClubTabSkeleton } from './skeleton/ClubTabSkeleton';

type ClubTabsClientProps = {
  introTab: ReactNode;
  feedTab: ReactNode;
};

export function ClubTabsClient({ introTab, feedTab }: ClubTabsClientProps) {
  return (
    <TabContainer>
      <Tabs defaultIndex={0}>
        <TabItem label="동아리 소개">
          <Suspense fallback={<ClubTabSkeleton />}>{introTab}</Suspense>
        </TabItem>
        <TabItem label="활동 피드">{feedTab}</TabItem>
      </Tabs>
    </TabContainer>
  );
}
