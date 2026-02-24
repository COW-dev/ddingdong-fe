import { TabItem, Tabs } from 'ddingdong-design-system';

import { EmailDeliveryStatus } from '@/app/_api/types/email';

import { EmailStatusList } from './EmailStatusList';

type EmailStatusTabsProps = {
  success: EmailDeliveryStatus[];
  fail: EmailDeliveryStatus[];
};

export function EmailStatusTabs({ success, fail }: EmailStatusTabsProps) {
  return (
    <Tabs defaultIndex={0} className="mt-4">
      <TabItem label="전송 완료">
        <EmailStatusList type="SUCCESS" data={success} />
      </TabItem>
      <TabItem label="전송 실패">
        <EmailStatusList type="FAIL" data={fail} />
      </TabItem>
    </Tabs>
  );
}
