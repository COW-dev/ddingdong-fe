'use client';

import { useRouter } from 'next/navigation';

import { Body1, Body3, Flex, NavBack, Caption1 } from 'ddingdong-design-system';

import { OptimizedImage } from '@/components/common/OptimizedImage';

import { BridgeMaruMari } from '../_components/ui/BridgeMaruMari';
import { GAME_IMAGES } from '../_utils/gameImages';

export default function GamePrizePage() {
  const router = useRouter();

  return (
    <Flex dir="col" className="min-h-screen pt-24">
      <Flex dir="col" className="mx-auto w-full max-w-md flex-1">
        <NavBack title="상품 안내" size="sm" onClick={() => router.back()} />

        <Flex dir="col" gap={6} className="mt-6">
          <section>
            <Flex
              dir="col"
              gap={1}
              alignItems="center"
              className="mb-2 text-center"
            >
              <Body1 className="font-school-safety text-gray-600">
                로고 짝 맞추고
              </Body1>
              <Body1
                weight="bold"
                className="font-school-safety text-center text-[#00D456]"
              >
                네이버페이 포인트 <span className="text-gray-600">받자!</span>
              </Body1>
            </Flex>

            <OptimizedImage src={GAME_IMAGES.naver_pay} alt="네이버페이" />
          </section>

          <section>
            <Body3
              weight="semibold"
              className="font-school-safety mb-2 text-gray-600"
            >
              상품 안내
            </Body3>
            <Caption1 className="text-gray-600">
              네이버페 이 1만원 권 (10명)
            </Caption1>
            <Caption1 className="mt-1 text-gray-300">
              * 5명 씩 양일 간 10명에게 추첨을 통해 지급됩니다.
            </Caption1>
          </section>

          <section>
            <Body3
              weight="semibold"
              className="font-school-safety mb-2 text-gray-600"
            >
              응모 자격
            </Body3>
            <Caption1 className="text-gray-600">
              2026년 1학기 학생회비 납부자
            </Caption1>
            <Caption1 className="mt-1 text-gray-300">
              * 학생회비 미납부 시, 게임 참여는 가능하나 응모는 불가합니다.
            </Caption1>
          </section>

          <section>
            <Body3
              weight="semibold"
              className="font-school-safety mb-2 text-gray-600"
            >
              응모 규칙
            </Body3>
            <Caption1 className="text-gray-600">
              게임은 여러 번 도전할 수 있으나, 기존 응모 내역이 있는 경우 응모는
              1회로 제한됩니다.
            </Caption1>
          </section>
        </Flex>

        <BridgeMaruMari className="relative bottom-0 left-1/2 mt-auto w-screen max-w-[100vw] -translate-x-1/2 pt-20" />
      </Flex>
    </Flex>
  );
}
