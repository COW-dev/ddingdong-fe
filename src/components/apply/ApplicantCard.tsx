import Link from 'next/link';
import { STATUS_TYPE } from '@/constants/apply';
import { Applicant } from '@/types/apply';
import { getDocumentStatus, getInterviewStatus } from '@/utils/filter';
import CheckBox from '../common/CheckBox';

type Props = {
  data: Applicant;
  type: 'DOCUMENT' | 'INTERVIEW';
  checked: boolean;
  onCheck: (checked: boolean) => void;
};
export default function ApplicantCard({ data, type, checked, onCheck }: Props) {
  const status =
    type === 'DOCUMENT'
      ? getDocumentStatus(data.status)
      : getInterviewStatus(data.status);

  return (
    <li key={data.id} className="flex w-full items-start gap-1">
      <CheckBox
        className="mt-1"
        value={checked}
        onChange={() => onCheck(!checked)}
      />
      <div className="w-full border-b border-gray-100 bg-white pb-3 transition-colors hover:border-gray-200 md:rounded-xl md:border-[1.5px] md:pb-0 md:hover:bg-gray-50">
        <Link
          href={`/apply/${data.formId}/${data.id}`}
          className="flex h-full flex-col justify-between md:p-6"
        >
          <div className="flex flex-row items-center justify-between">
            <div>
              <div className="text-base font-semibold md:text-xl md:font-bold">
                {data.name}
              </div>
              <div className="flex flex-row items-center justify-start gap-1">
                {/* TODO : 학과 추가시 주석 해제 */}
                {/* <span className="text-md text-purple-700 md:font-semibold">
                  {data.department}
                </span>
                <span>|</span> */}
                <span className="text-sm text-gray-500 md:text-base md:font-semibold">
                  {data.studentNumber}
                </span>
              </div>
            </div>
            <div
              className={`${STATUS_TYPE[status].backgroundColor} ${STATUS_TYPE[status].color} rounded-lg px-2 py-1 text-sm font-semibold`}
            >
              {STATUS_TYPE[status].text}
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
}
