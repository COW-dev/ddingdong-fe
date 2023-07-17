import CreateClub from '@/components/modal/CreateClub';
import DeleteClub from '@/components/modal/DeleteClub';
import ModifyClub from '@/components/modal/ModifyClub';
import { AdminClub } from '@/types';

export interface ModalType {
  title: string | null;
  content: (({ data, setModal }: ModalProp) => React.ReactNode) | null;
}

export type ModalProp = {
  data: AdminClub;
  setModal: (flag: ModalType) => void;
};

export const MODAL_TYPE: Record<string, ModalType> = {
  create: {
    title: '동아리 생성하기',
    content: CreateClub,
  },
  modify: {
    title: '동아리 수정하기',
    content: ModifyClub,
  },
  delete: {
    title: '동아리 삭제하기',
    content: DeleteClub,
  },
  null: {
    title: null,
    content: null,
  },
};
