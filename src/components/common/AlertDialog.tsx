const DIALOG_TYPE = {
  delete: {
    color: 'red',
    message: '삭제하기',
    title: '{target}를 삭제하시겠습니까?',
  },
};

type AlertDialogProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: keyof typeof DIALOG_TYPE;
  target?: string;
};

function AlertDialog({
  onConfirm,
  onCancel,
  type = 'delete',
  target = '',
}: AlertDialogProps) {
  const title = DIALOG_TYPE[type].title.replace('{target}', target || '');

  return (
    <>
      <h1 className="text-center text-xl font-bold">{title}</h1>
      <div className="m-auto flex max-w-80 gap-2">
        <button
          className="w-[25%] rounded-xl bg-gray-200 py-3.5 text-base font-bold text-gray-500 transition-colors hover:bg-gray-300 md:text-lg"
          onClick={onCancel}
        >
          취소
        </button>
        <button
          className={`w-[75%] rounded-xl py-3.5 text-base font-bold text-white transition-colors md:text-lg bg-${DIALOG_TYPE[type].color}-400 hover:bg-${DIALOG_TYPE[type].color}-500`}
          onClick={onConfirm}
        >
          {DIALOG_TYPE[type].message}
        </button>
      </div>
    </>
  );
}

export default AlertDialog;
