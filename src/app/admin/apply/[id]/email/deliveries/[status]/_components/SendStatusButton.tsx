'use client';

import { Body3, Caption1, Flex, Icon } from 'ddingdong-design-system';

import { EmailDeliveryStatus } from '@/app/_api/types/email';
import { useClickOutside } from '@/hooks/useClickOutside';

type SendStatusProps = {
  sendingList: EmailDeliveryStatus[];
};

export function SendStatusButton({ sendingList }: SendStatusProps) {
  const { isOpen, setIsOpen, ref } = useClickOutside();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-2 border-none bg-none p-0"
      >
        <Body3 className="cursor-pointer">전송 중인 이메일</Body3>
        <Icon name="send" size={15} color="black" className="mt-0.5" />
      </button>
      {isOpen && sendingList.length > 0 && (
        <div className="absolute top-full right-0 z-10 mt-2 w-72 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
          <div className="p-2">
            <Body3
              weight="bold"
              color="gray"
              className="border-b border-gray-200 pb-1"
            >
              {sendingList.length}명에게 전송 중
            </Body3>
          </div>
          <Flex dir="col" gap={2} className="max-h-[300px] overflow-y-auto p-2">
            {sendingList.map((item, index) => (
              <Flex
                key={index}
                dir="col"
                alignItems="start"
                gap={1}
                className="border-b border-gray-100 py-1 last:border-0"
              >
                <Caption1>{item.name}</Caption1>
                <Caption1 className="text-gray-400">
                  발송 시간:{' '}
                  {item.sendAt
                    ? new Date(item.sendAt).toLocaleString()
                    : '대기중'}
                </Caption1>
              </Flex>
            ))}
          </Flex>
        </div>
      )}
    </div>
  );
}
