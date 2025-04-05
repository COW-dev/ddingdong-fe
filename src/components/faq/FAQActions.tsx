interface type {
  isEditing: boolean;
  isSaving?: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  saveFAQ: () => void;
  addFAQ: () => void;
}

export default function FAQActions({
  isEditing,
  isSaving,
  setIsEditing,
  saveFAQ,
  addFAQ,
}: type) {
  return (
    <div className="flex flex-col items-end justify-between">
      {isEditing ? (
        <div>
          <button
            onClick={() => setIsEditing(false)}
            className="ml-3 h-10 rounded-lg bg-gray-100 px-4.5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-200"
          >
            취소
          </button>
          <button
            onClick={saveFAQ}
            className={`ml-3 h-10 rounded-lg px-4.5 py-2 text-sm font-bold text-white 
                  ${
                    isSaving
                      ? 'cursor-not-allowed bg-gray-500'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
            disabled={isSaving}
          >
            저장하기
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="ml-3 h-10 rounded-lg bg-blue-100 px-4.5 py-2 text-sm font-bold text-blue-500 hover:bg-blue-200"
        >
          수정하기
        </button>
      )}

      {isEditing && (
        <div className="flex w-full flex-row justify-end pt-6">
          <div
            onClick={addFAQ}
            className="flex w-16 cursor-pointer justify-end border-b-2 border-gray-600 pb-0 font-bold text-gray-600"
          >
            FAQ 추가
          </div>
        </div>
      )}
    </div>
  );
}
