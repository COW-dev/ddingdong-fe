interface AlertDialogProps {
  onConfirm?: () => void;
  onCancle?: () => void;
}

function AlertDialog({ onConfirm, onCancle }: AlertDialogProps) {
  return (
    <>
      <div className="mb-2 w-full ">
        <button
          className="mx-5 w-[40%] rounded-xl bg-red-400 py-4 font-bold text-white transition-colors hover:bg-red-500 sm:mt-5 sm:py-4 sm:text-lg "
          onClick={onConfirm}
        >
          확인
        </button>
        <button
          className="mx-5 w-[40%] rounded-xl bg-gray-200 py-4 font-bold text-white transition-colors hover:bg-gray-400 sm:mt-5 sm:py-4 sm:text-lg "
          onClick={onCancle}
        >
          취소
        </button>
      </div>
    </>
  );
}

export default AlertDialog;
