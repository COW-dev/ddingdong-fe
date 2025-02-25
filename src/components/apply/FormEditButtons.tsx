import React from 'react';
import { FormState } from '@/types/form';

type ModeType = 'view' | 'edit';

type Props = {
  formData: FormState;
  mode: ModeType;
  onReset: () => void;
};

export default function FormEditButtons({ formData, mode, onReset }: Props) {
  const onClickEditButton = () => {};
  const handleCreateForm = () => {};
  const onClickCancelButton = () => {};
  const handleUpdateForm = () => {};

  return (
    <div className="mt-7 flex items-center justify-between gap-2 text-lg">
      {formData ? (
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
