import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { useUpdateApplicantStatus } from '@/hooks/api/apply/useUpdateApplicantStatus';
import { Applicant } from '@/types/apply';
import {
  filterApplicantsByStatus,
  filterFailedApplicants,
  filterPassedApplicants,
  getButtonStyle,
} from '@/utils/filter';
import ApplicantCard from './ApplicantCard';
import CheckBox from '../common/CheckBox';
import SearchBar from '../home/SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type Props = {
  type?: 'DOCUMENT' | 'INTERVIEW';
  data: Applicant[];
};

export default function ApplicantList({ type = 'DOCUMENT', data }: Props) {
  const [{ token }] = useCookies(['token']);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [selectedApplicants, setSelectedApplicants] = useState<{
    DOCUMENT: Set<number>;
    INTERVIEW: Set<number>;
  }>({ DOCUMENT: new Set(), INTERVIEW: new Set() });
  const [keyword, setKeyword] = useState<string>('');
  const [filterType, setFilterType] = useState<'ALL' | 'PASS' | 'FAIL'>('ALL');
  const [applicants, setApplicants] = useState<Applicant[]>(data);
  const [passedApplicants, setPassedApplicants] = useState<Applicant[]>([]);
  const [failedApplicants, setFailedApplicants] = useState<Applicant[]>([]);

  const mutation = useUpdateApplicantStatus();

  useEffect(() => {
    setFilterType('ALL');
  }, [type]);

  useEffect(() => {
    const passed = filterPassedApplicants(data, type);
    const failed = filterFailedApplicants(data, type);
    setPassedApplicants(passed);
    setFailedApplicants(failed);
  }, [data, type]);

  useEffect(() => {
    const filtered = data
      .filter((applicant) => applicant.name.includes(keyword))
      .filter((applicant) => {
        const statusFiltered = filterApplicantsByStatus(
          [applicant],
          type,
          filterType,
        );
        return statusFiltered.length > 0;
      });
    setApplicants(filtered);
  }, [keyword, filterType, type, data]);

  const handleAllCheck = () => {
    const newAllChecked = !allChecked;
    setAllChecked(newAllChecked);
    setSelectedApplicants((prev) => ({
      ...prev,
      [type]: newAllChecked
        ? new Set(applicants.map((applicant) => applicant.id))
        : new Set(),
    }));
  };

  const handleCheckApplicant = (id: number, checked: boolean) => {
    setSelectedApplicants((prev) => {
      const newSelected = new Set(prev[type]);
      if (checked) newSelected.add(id);
      if (!checked) newSelected.delete(id);
      return { ...prev, [type]: newSelected };
    });
    setAllChecked(
      applicants.every((app) =>
        checked
          ? selectedApplicants[type].has(app.id) || app.id === id
          : selectedApplicants[type].has(app.id) && app.id !== id,
      ),
    );
  };

  const handleUpdateStatus = (
    status: 'FIRST_PASS' | 'FIRST_FAIL' | 'FINAL_PASS' | 'FINAL_FAIL',
  ) => {
    mutation.mutate({
      formId: data[0].formId,
      applicationIds: Array.from(selectedApplicants[type]),
      status: status,
      token: token,
    });
    setAllChecked(false);
    setSelectedApplicants((prev) => ({ ...prev, [type]: new Set() }));
  };
  return (
    <>
      <div className="flex w-full flex-col items-start justify-between border-b pb-0 md:flex-row-reverse md:items-center md:gap-2 md:pb-3">
        <div className="w-full md:w-64">
          <SearchBar type="apply" value={keyword} onChange={setKeyword} />
        </div>
        <div className="flex h-12 w-full flex-row items-center justify-between text-sm font-semibold text-gray-500 md:justify-start md:text-base">
          <div className="flex h-12 flex-row items-center gap-2 whitespace-nowrap md:gap-4 md:whitespace-normal">
            <CheckBox value={allChecked} onChange={handleAllCheck} />
            <button
              onClick={() => setFilterType('ALL')}
              className={getButtonStyle(filterType, 'ALL')}
            >
              전체({data?.length})
            </button>
            <span>|</span>
            <button
              onClick={() => setFilterType('PASS')}
              className={getButtonStyle(filterType, 'PASS')}
            >
              합격({passedApplicants.length})
            </button>
            <span>|</span>
            <button
              onClick={() => setFilterType('FAIL')}
              className={getButtonStyle(filterType, 'FAIL')}
            >
              불합격({failedApplicants.length})
            </button>
          </div>
          <div className="rounded-md border px-1 py-0.5 md:ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="mt-0.5 flex items-center px-1 outline-none">
                합격여부선택
                <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 min-w-[110px] p-2 font-semibold md:min-w-[120px]">
                <DropdownMenuItem
                  className="justify-center text-sm text-gray-500 md:text-base"
                  disabled={selectedApplicants[type].size === 0}
                  onClick={() =>
                    handleUpdateStatus(
                      type === 'DOCUMENT' ? 'FIRST_PASS' : 'FINAL_PASS',
                    )
                  }
                >
                  합격
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="justify-center text-sm text-gray-500 md:text-base"
                  disabled={selectedApplicants[type].size === 0}
                  onClick={() =>
                    handleUpdateStatus(
                      type === 'DOCUMENT' ? 'FIRST_FAIL' : 'FINAL_FAIL',
                    )
                  }
                >
                  불합격
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <ul className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {applicants?.map((item, index) => (
          <ApplicantCard
            key={index}
            data={item}
            type={type}
            checked={selectedApplicants[type].has(item.id)}
            onCheck={(checked) => handleCheckApplicant(item.id, checked)}
          />
        ))}
      </ul>
    </>
  );
}
