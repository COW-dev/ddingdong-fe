import { getApplicantInfo } from '@/constants/apply';
import { Answer } from '@/types/apply';
import ApplyContentBox from './ApplyContentBox';

type Props = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
  formFieldAnswers: Answer[];
};

export default function ApplicantInfo({ ...props }: Props) {
  const { formFieldAnswers } = props;
  const section = formFieldAnswers.find((answer) => answer.section !== '공통');
  const info = getApplicantInfo(props);

  return (
    <div className="mt-2">
      <span className="ml-3 w-[50px] cursor-pointer rounded-md rounded-b-none  border-gray-200 bg-blue-50 px-2.5 py-1 font-bold text-blue-500">
        {section ? section.section : '공통'}
      </span>
      <ApplyContentBox className=" md:flex-row md:items-start">
        {info.map(({ label, value }) => (
          <div
            key={label}
            className="flex items-start justify-start gap-4 md:mr-6 md:flex-col md:gap-3"
          >
            <span className="font-semibold text-blue-500 md:text-xl md:font-bold">
              {label}
            </span>
            <span className="text-base font-semibold text-gray-400">
              {value}
            </span>
          </div>
        ))}
      </ApplyContentBox>
    </div>
  );
}
