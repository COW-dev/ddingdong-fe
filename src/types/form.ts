export interface ManageFormProps {
  formData?: FormData;
}

export interface FormAnswer {
  fieldId: string | number;
  value: string | string[];
}

export interface ApplyData {
  name: string;
  studentNumber: string;
  department: string;
  email: string;
  phoneNumber: string;
  formAnswers: {
    fieldId: string | number;
    value: string | string[];
  }[];
}

export interface FormBlockData {
  formId: number;
  title: string;
  startDate: string;
  endDate: string;
  formStatus: '진행 전' | '진행 중' | '마감';
  onClick: () => void;
}
