import React from 'react';
import { useCookies } from 'react-cookie';
import { useNewForm } from '@/hooks/api/apply/useNewForm';
import { useUpdateForm } from '@/hooks/api/apply/useUpdateForm';
import { FormState } from '@/types/form';

type ModeType = 'view' | 'edit';

type Props = {
  formData: FormState | undefined;
  mode: ModeType;
  onReset: () => void;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
  formState: FormState;
  id: number | undefined;
};

export default function FormEditButtons({
  formData,
  mode,
  onReset,
  setMode,
  formState,
  id,
}: Props) {
  const [{ token }] = useCookies(['token']);
  const newFormMutation = useNewForm(token);
  const updateFormMutation = useUpdateForm(setMode);

  const onClickEditButton = () => {
    setMode('edit');
  };
  const handleCreateForm = () => {
    newFormMutation.mutate({
      ...formState,
      startDate: formState.startDate || '',
      endDate: formState.endDate || '',
    });
  };
  const onClickCancelButton = () => {
    setMode('view');
    onReset();
  };
  const handleUpdateForm = () => {
    if (id === undefined) {
      return;
    }
    updateFormMutation.mutate({
      token,
      formId: id,
      formData: {
        ...formState,
        startDate: formState.startDate || '',
        endDate: formState.endDate || '',
      },
    });
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
              className={
                'cursor-pointer rounded-xl bg-blue-100 px-4 py-2 font-semibold text-blue-500 hover:bg-blue-200'
              onClick={onClickEditButton}
              className={
                'cursor-pointer rounded-xl bg-blue-100 px-4 py-2 font-semibold text-blue-500 hover:bg-blue-200'
              }
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
