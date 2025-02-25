import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '@/components/common/Modal';
import BaseInput from './BaseInput';

type PromptProps = {
  visible: boolean;
  closeModal: () => void;
  title?: string;
  description?: string;
  placeholder?: string;
  maxLength?: number;
  confirmText?: string;
  cancelText?: string;
  closeButton?: boolean;
  onConfirm: (value: string) => void;
};

export default function Prompt({
  visible,
  closeModal,
  title = '입력해주세요',
  description,
  placeholder = '입력하세요...',
  maxLength = 10,
  confirmText = '확인',
  cancelText = '취소',
  closeButton = true,
  onConfirm,
}: PromptProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      toast.error('값을 입력해주세요.');
      return;
    }

    onConfirm(inputValue.trim());
    setInputValue('');
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Modal
      visible={visible}
      closeModal={closeModal}
      modalRef={modalRef}
      closeButton={closeButton}
    >
      <div className="flex flex-col gap-4 px-4 py-1">
        <h2 className="text-center text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-center text-sm text-gray-500">{description}</p>
        )}
        <BaseInput
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex w-full justify-center gap-2">
        <button
          className="rounded-xl bg-gray-100 px-3 py-2 text-base font-semibold text-gray-500 hover:bg-gray-200"
          onClick={closeModal}
        >
          {cancelText}
        </button>
        <button
          className="rounded-xl bg-blue-500 px-8 text-base font-semibold text-white hover:bg-blue-600"
          onClick={handleSubmit}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
