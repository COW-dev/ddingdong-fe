import React from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useNewForm } from '@/hooks/api/apply/useNewForm';
import { useUpdateForm } from '@/hooks/api/apply/useUpdateForm';
import { useUpdateFormDeadline } from '@/hooks/api/apply/useUpdateFormDeadline';
import { useFormStore } from '@/store/form';
import { FormState } from '@/types/form';

type ModeType = 'view' | 'edit';

type Props = {
  formData: FormState | undefined;
  mode: ModeType;
  onReset: () => void;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  formState: FormState;
  id: number | undefined;
  isPastStartDate: boolean;
  formId: string;
};

export default function FormEditButtons({
  isPastStartDate,
  formData,
  mode,
  onReset,
  setMode,
  formState,
  id,
  formId,
}: Props) {
  const [{ token }] = useCookies(['token']);
  const { saveChanges, updateFormId, resetToOriginal } = useFormStore();

  const newFormMutation = useNewForm(token, updateFormId, saveChanges, formId);
  const updateFormMutation = useUpdateForm(setMode, saveChanges, formId);
  const updateFormDeadlineMutation = useUpdateFormDeadline();

  const onClickEditButton = () => {
    setMode('edit');
  };

  function checkFieldQuestionPresence() {
    if (!formState.sections || !formState.formFields) return false;
    return formState.sections.every((section) =>
      formState.formFields.some((field) => field.section === section),
    );
  }

  const handleCreateForm = () => {
    if (!checkFieldQuestionPresence()) {
      toast.error('모든 필드에 질문을 하나 이상 추가해주세요.');
      return;
    }
    newFormMutation.mutate({
      ...formState,
      startDate: formState.startDate || '',
      endDate: formState.endDate || '',
    });
  };

  const onClickCancelButton = () => {
    if (id) {
      resetToOriginal(formId);
    }
    setMode('view');
    onReset();
  };

  const handleUpdateForm = () => {
    if (id === undefined) {
      return;
    }
    if (!checkFieldQuestionPresence()) {
      toast.error('모든 필드에 질문을 하나 이상 추가해주세요.');
      return;
    }
    if (isPastStartDate) {
      updateFormDeadlineMutation.mutate({
        token,
        formId: id,
        endDate: formState.endDate || '',
      });
    } else {
      updateFormMutation.mutate({
        token,
        formId: id,
        formData: {
          ...formState,
          startDate: formState.startDate || '',
          endDate: formState.endDate || '',
        },
      });
    }
  };

  return (
    <div className="mt-7 flex items-center justify-between gap-2 text-lg">
      {!formData ? (
        <button
          className="rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          onClick={handleCreateForm}
        >
          저장하기
        </button>
      ) : (
        <>
          {mode == 'view' ? (
            <button
              onClick={onClickEditButton}
              className="cursor-pointer rounded-xl bg-blue-100 px-4 py-2 font-semibold text-blue-500 hover:bg-blue-200"
            >
              수정하기
            </button>
          ) : (
            <div className="flex flex-row gap-2">
              <button
                onClick={onClickCancelButton}
                className="rounded-xl bg-gray-100 px-3 py-2 font-semibold text-gray-500 hover:bg-gray-200"
              >
                취소
              </button>
              <button
                onClick={handleUpdateForm}
                className="rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-400"
              >
                저장하기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
