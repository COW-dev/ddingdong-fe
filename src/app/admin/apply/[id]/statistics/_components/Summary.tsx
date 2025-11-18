'use client';
import Image from 'next/image';

import BarChart from '@/components/common/bar-chart';
import LineChart from '@/components/common/line-chart';

// import OptionModal from '../ui/OptionModal';
import { useSummary } from '../_hooks/useSummary';
import {
  Badge,
  Body3,
  Card,
  Flex,
  Icon,
  Tooltip,
  usePortal,
} from 'ddingdong-design-system';
import { RankingModal } from './RankingModal';

export default function Summary({ applyId }: { applyId: number }) {
  const { isFirstApply, applicantStatistics, departmentRanks } =
    useSummary(applyId);
  const { isOpen, closeModal, openModal } = usePortal();

  return (
    <Card className="flex flex-col flex-wrap items-center gap-10 hover:bg-white md:flex-row md:items-end md:justify-around">
      <section className="max-w-[250px] flex-none md:w-[300px]">
        <LineChart data={applicantStatistics} />
        <Flex justifyContent="center" className="m-3">
          <Body3>최근 모집 대비 지원자 수</Body3>
          {isFirstApply && (
            <Tooltip
              content="신규 기능 개설로 이전(2024.09) 지원자 수는 동아리원 수를 가져왔어요"
              color="gray"
            >
              {/* 아이콘 변경 필요 */}
              <Icon name="new" size={25} />
            </Tooltip>
          )}
        </Flex>
      </section>
      <Flex
        dir="col"
        alignItems="center"
        as="section"
        className="shrink md:w-[400px]"
      >
        <div>
          <BarChart data={departmentRanks} />
        </div>
        <Flex gap={2} alignItems="center">
          <Body3>지원 학과 TOP 5</Body3>
          <div className="cursor-pointer">
            <Badge variant="neutral" text="보기" onClick={openModal} />
            <RankingModal
              isOpen={isOpen}
              onClose={closeModal}
              departmentRanks={departmentRanks}
            />
          </div>
        </Flex>
      </Flex>
    </Card>
  );
}
