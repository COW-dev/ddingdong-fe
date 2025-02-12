import { useCookies } from 'react-cookie';
import TableChart from '@/components/ui/bar-chart';
import LineChart from '@/components/ui/line-chart';
import { useApplyStatistics } from '@/hooks/api/apply/useApplyStatistics';
import { MOCK_ApplyStatistics } from '@/pages/test/test';

type Props = {
  applyId: number;
};

export default function StatisticsIntro({ applyId }: Props) {
  const [{ token }] = useCookies(['token']);
  // const { data } = useApplyStatistics(applyId, token);
  const data = { data: MOCK_ApplyStatistics };
  console.log(data?.data);
  const sortDepartmentRanksByLabel = () => {
    if (!data?.data.departmentStatistics) return [];
    return (
      data?.data.departmentStatistics.sort((a, b) =>
        a.label.localeCompare(b.label),
      ) ?? data?.data.departmentStatistics
    );
  };

  return (
    <div className="flex flex-col flex-wrap items-center gap-10 rounded-md border border-[#E5E7EB] p-6 text-base font-semibold text-[#4B5563] md:flex-row md:items-end md:justify-around md:p-8 md:text-xl md:font-bold">
      <section className="max-w-[250px] flex-none md:w-[300px]">
        <LineChart passedData={data?.data.applicantStatistics ?? []} />
        <h2 className="m-3 text-center">지난 모집 대비 지원률</h2>
      </section>
      <section className="shrink md:w-[400px]">
        <div>
          <TableChart passedData={sortDepartmentRanksByLabel()} />
        </div>
        <h2 className="m-3 text-center">지원 학과 TOP 5</h2>
      </section>
    </div>
  );
}
