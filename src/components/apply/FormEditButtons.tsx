import React from 'react';
import { CreateFormData } from '@/types/form';

type Props = {
  formData?: CreateFormData;
  isEditing: boolean;
  isClosed: boolean;
  isPastStartDate: boolean;
  handleCreateForm: () => void;
  onClickEditButton: () => void;
  onClickCancelButton: () => void;
  handleUpdateForm: () => void;
};

export default function FormEditButtons({
  formData,
  isEditing,
  handleCreateForm,
  onClickEditButton,
  onClickCancelButton,
  handleUpdateForm,
}: Props) {
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
          {!isEditing ? (
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
