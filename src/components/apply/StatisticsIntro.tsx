import Image from 'next/image';

import { useCookies } from 'react-cookie';
import InfoIcon from '@/assets/info.svg';
import BarChart from '@/components/common/bar-chart';
import LineChart from '@/components/common/line-chart';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useApplyStatistics } from '@/hooks/api/apply/useApplyStatistics';
import { ChartItem } from '@/types/apply';
import OptionModal from '../ui/OptionModal';

type Props = {
  applyId: number;
};

export default function StatisticsIntro({ applyId }: Props) {
  const [{ token }] = useCookies(['token']);
  const { data } = useApplyStatistics(applyId, token);
  const sortDepartmentRanksByLabel = (): ChartItem[] => {
    if (!data?.data.departmentStatistics) return [];
    return (
      data?.data.departmentStatistics.sort((a: ChartItem, b: ChartItem) =>
        a.label.localeCompare(b.label),
      ) ?? data?.data.departmentStatistics
    );
  };
  return (
    <div className="flex flex-col flex-wrap items-center gap-10 rounded-md border border-[#E5E7EB] p-6 text-base font-semibold text-[#4B5563] md:flex-row md:items-end md:justify-around md:p-8 md:text-xl md:font-bold">
      <section className="max-w-[250px] flex-none md:w-[300px]">
        <LineChart passedData={data?.data.applicantStatistics ?? []} />
        <div className="m-3 flex justify-center">
          <h2 className="mr-1 text-center">최근 모집 대비 지원자 수</h2>
          <ApplicantAnnounceIcon />
        </div>
      </section>
      <section className="flex shrink flex-col items-center md:w-[400px]">
        <div>
          <BarChart passedData={sortDepartmentRanksByLabel()} />
        </div>
        <div className="relative flex items-center">
          <h2 className="m-3 text-center">지원 학과 TOP 5</h2>
          <div className="absolute -right-8 bottom-3 ">
            <OptionModal
              labels={
                sortDepartmentRanksByLabel().map(
                  (item: ChartItem) => item.label,
                ) ?? []
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ApplicantAnnounceIcon() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Image src={InfoIcon} width={22} height={22} alt={'announce_icon'} />
        </TooltipTrigger>
        <TooltipContent
          sideOffset={0}
          side="bottom"
          className="m-0 flex flex-col gap-0"
        >
          <p className="rounded-md bg-[#EFF6FF] p-2.5 text-xs">
            신규 기능 개설로 기존(2024.09) <br />
            동아리원을 이전 동아리원 수로 대체했어요
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
