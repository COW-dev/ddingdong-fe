import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from '@/components/common/Modal';
import { departmentInfo } from '@/constants/department';
import BaseInput from '../apply/BaseInput';
import { StepDropdown } from '../apply/StepDropdown';
import Dropdown from '../member/Dropdown';

export type RoleType = 'MEMBER' | 'EXECUTIVE' | 'LEADER';

export interface MemberFormData {
  name: string;
  studentNumber: string;
  department: string;
  phoneNumber: string;
  position: string;
}

type AddMemberModalProps = {
  visible: boolean;
  closeModal: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  onConfirm: (data: MemberFormData) => void;
};

export default function AddMemberModal({
  visible,
  closeModal,
  modalRef,
  onConfirm,
}: AddMemberModalProps) {
  const [form, setForm] = useState<MemberFormData>({
    name: '',
    studentNumber: '',
    department: '',
    phoneNumber: '',
    position: '동아리원',
  });

  useEffect(() => {
    if (!visible) {
      setForm({
        name: '',
        studentNumber: '',
        department: '',
        phoneNumber: '',
        position: '',
      });
    }
  }, [visible]);

  const handleBlur = (key: keyof MemberFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const { name, studentNumber, department, phoneNumber } = form;
    if (!name || !studentNumber || !department || !phoneNumber) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }
    onConfirm(form);
  };

  return (
    <Modal
      visible={visible}
      closeModal={closeModal}
      closeButton
      modalRef={modalRef}
    >
      <div className="w-full bg-white px-2">
        <div className="flex flex-col gap-3">
          <p className="pb-2 text-2xl font-semibold">동아리원 명단 추가</p>
          <BaseInput
            label="이름"
            placeholder="이름을 입력해 주세요."
            defaultValue={form.name}
            onChange={(e) => handleBlur('name', e.target.value)}
          />
          <BaseInput
            label="학번"
            placeholder="학번을 입력해 주세요."
            defaultValue={form.studentNumber}
            onChange={(e) => handleBlur('studentNumber', e.target.value)}
          />
          <StepDropdown
            label="학과"
            contents={departmentInfo}
            selectedContent={form.department}
            selectItem={(value) => handleBlur('department', value)}
          />
          <BaseInput
            label="전화번호(' - '포함)"
            placeholder="전화번호를 입력해 주세요."
            defaultValue={form.phoneNumber}
            onChange={(e) => handleBlur('phoneNumber', e.target.value)}
          />

          <label className="block px-1 text-lg font-bold text-blue-500 md:text-xl ">
            직급
          </label>
          <Dropdown<RoleType>
            contents={['MEMBER', 'EXECUTIVE', 'LEADER']}
            selected={form.position as RoleType}
            setSelected={(val) => handleBlur('position', val)}
            labelConverter={(val) => {
              const translations: Record<RoleType, string> = {
                MEMBER: '동아리원',
                EXECUTIVE: '임원',
                LEADER: '회장',
              };
              return translations[val] || val;
            }}
          />
        </div>

        <div className="mt-10 flex justify-center gap-2">
          <button
            className="rounded-xl bg-gray-200 px-4 py-2 font-semibold text-neutral-500 hover:bg-gray-300"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-[150px] rounded-xl bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-400"
            onClick={handleSubmit}
          >
            추가
          </button>
        </div>
      </div>
    </Modal>
  );
}
