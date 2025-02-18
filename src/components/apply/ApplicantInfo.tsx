import { getApplicantInfo } from '@/constants/apply';
import ApplyContentBox from './ApplyContentBox';

type Props = {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  email: string;
};

export default function ApplicantInfo({ ...props }: Props) {
  const info = getApplicantInfo(props);

  return (
    <ApplyContentBox className="md:flex-row md:items-start">
      {info.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-start justify-start gap-4 md:mr-6 md:flex-col md:gap-3"
        >
          <span className="font-semibold text-blue-500 md:text-xl md:font-bold">
            {label}
          </span>
          <span className="text-base font-semibold text-gray-400">{value}</span>
        </div>
      ))}
    </ApplyContentBox>
  );
}
