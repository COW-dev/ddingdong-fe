import { useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';

import { useUpdateApplicantNote } from '@/app/_api/mutations/apply';

export const useApplicantNote = (
  formId: number,
  applicantId: number,
  initialNote: string,
) => {
  const [note, setNote] = useState<string>(initialNote || '');
  const noteMutation = useUpdateApplicantNote();

  useEffect(() => {
    setNote(initialNote || '');
  }, [initialNote]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleUpdateNote = () => {
    noteMutation.mutate(
      {
        formId,
        applicationId: applicantId,
        note,
      },
      {
        onSuccess: () => {
          toast.success('지원자 메모 수정에 성공했어요.');
        },
        onError: () => {
          toast.error('지원자 메모 수정에 실패했어요.');
        },
      },
    );
  };

  return {
    note,
    handleNoteChange,
    handleUpdateNote,
  };
};
