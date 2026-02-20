'use client';

import { useRouter } from 'next/navigation';

import { Caption1, Flex, NavBack } from 'ddingdong-design-system';

import { BridgeMaruMari } from '../_components/ui/BridgeMaruMari';

export default function GameGuidePage() {
  const router = useRouter();

  return (
    <Flex dir="col" className="mx-auto min-h-screen w-full max-w-md pt-24">
      <NavBack
        title="동아리 카드 짝 맞추기 게임 안내"
        size="sm"
        onClick={() => router.back()}
      />

      <Flex dir="col" gap={6} className="mt-6">
        <section>
          <Caption1 weight="bold" className="mb-2 text-gray-600" as="h2">
            게임 이용 안내
          </Caption1>
          <Caption1 className="text-gray-600" as="p">
            게임은 횟수 제한 없이 계속 도전할 수 있습니다. 총 5단계로 구성되어,
            모든 단계 성공 시 상품 응모가 가능합니다.
          </Caption1>
        </section>

        <section>
          <Caption1 weight="bold" className="mb-2 text-gray-600" as="h2">
            응모 규칙 안내
          </Caption1>
          <ul className="list-disc pl-5">
            <li>
              <Caption1 className="text-gray-600">
                게임은 여러 번 도전할 수 있으나, 기존 응모 내역이 있는 경우
                응모는 1회로 제한됩니다.
              </Caption1>
            </li>
          </ul>
        </section>

        <section>
          <Caption1 weight="bold" className="mb-2 text-gray-600" as="h2">
            응모 자격 안내
          </Caption1>
          <ul className="list-disc pl-5">
            <li>
              <Caption1 className="text-gray-600">
                본 이벤트는 학생회비 납부자에 한해 응모가 가능합니다.
              </Caption1>
            </li>
            <li>
              <Caption1 className="text-gray-600">
                학생회비 미납부 시, 게임 참여는 가능하나 응모는 불가합니다.
              </Caption1>
            </li>
          </ul>
        </section>

        <section>
          <Caption1 weight="bold" className="mb-2 text-gray-600" as="h2">
            개인정보 수집 및 이용 안내
          </Caption1>
          <ul className="list-disc pl-5">
            <li>
              <Caption1 className="text-gray-600">
                모든 라운드를 클리어한 경우, 아래 정보를 수집합니다.
              </Caption1>
              <ul className="mt-1">
                <li>
                  <Caption1 className="text-gray-600">- 이름</Caption1>
                </li>
                <li>
                  <Caption1 className="text-gray-600">- 학번</Caption1>
                </li>
                <li>
                  <Caption1 className="text-gray-600">- 학과</Caption1>
                </li>
                <li>
                  <Caption1 className="text-gray-600">- 전화번호</Caption1>
                </li>
                <li>
                  <Caption1 className="text-gray-600">
                    - 학생회비 납부 내역
                  </Caption1>
                </li>
              </ul>
            </li>
            <li>
              <Caption1 className="text-gray-600">
                수집된 개인정보는 상품 응모 및 당첨자 확인을 위한 목적으로만
                사용됩니다.
              </Caption1>
            </li>
          </ul>
        </section>
      </Flex>

      <BridgeMaruMari className="relative bottom-0 left-1/2 mt-auto w-screen max-w-[100vw] -translate-x-1/2 pt-20" />
    </Flex>
  );
}
