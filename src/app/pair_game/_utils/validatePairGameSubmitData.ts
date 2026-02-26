import { toast } from 'react-hot-toast';

import {
  pairGameSubmitSchema,
  type PairGameSubmitType,
} from '@/types/schemas/pairGameSubmitSchema';

type ValidatePairGameSubmitInput = {
  formData: PairGameSubmitType;
  receiptFile: File | null;
};

export function validatePairGameSubmitData({
  formData,
  receiptFile,
}: ValidatePairGameSubmitInput): boolean {
  const result = pairGameSubmitSchema.safeParse(formData);

  if (!result.success) {
    const formattedErrors = result.error.format();
    const firstErrorMessage = Object.values(formattedErrors)
      .flatMap((error) => (error && '_errors' in error ? error._errors : []))
      .find(Boolean);

    if (firstErrorMessage) {
      toast.error(firstErrorMessage);
    }
    return false;
  }

  if (!receiptFile) {
    toast.error('학생회비 납부 내역 파일을 첨부해주세요.');
    return false;
  }

  return true;
}
