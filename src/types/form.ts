export interface ManageFormProps {
  formData?: FormData;
}

export interface FormBlockData {
  formId: number;
  title: string;
  startDate: string;
  endDate: string;
  formStatus: '진행 전' | '진행 중' | '마감';
  onClick: () => void;
}
