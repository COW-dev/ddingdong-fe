import CreateBanner from '@/components/modal/banner/CreateBanner';
import CreateClub from '@/components/modal/club/CreateClub';
import DeleteClub from '@/components/modal/club/DeleteClub';
import ModifyClub from '@/components/modal/club/ModifyClub';
import { modalPropType } from '@/types';
import DeleteBanner from './banner/DeleteBanner';
import ModifyBanner from './banner/ModifyBanner';
import Participants from './report/Paticipants';

export interface ModalType {
  title: string | null;
  content: (({ data, setModal }: ModalProp) => React.ReactNode) | null;
}
export type ModalProp = {
  data: modalPropType;
  setModal: (flag: ModalType) => void;
};

export const MODAL_TYPE: Record<string, ModalType> = {
  createClub: {
    title: '동아리 생성하기',
    content: CreateClub,
  },
  createBanner: {
    title: '배너 생성하기',
    content: CreateBanner,
  },
  modifyClub: {
    title: '동아리 수정하기',
    content: ModifyClub,
  },
  modifyBanner: {
    title: '배너 수정하기',
    content: ModifyBanner,
  },
  deleteClub: {
    title: '동아리 삭제하기',
    content: DeleteClub,
  },
  deleteBanner: {
    title: '배너 삭제하기',
    content: DeleteBanner,
  },
  participants: {
    title: '참여 인원 작성',
    content: Participants,
  },
  null: {
    title: null,
    content: null,
  },
};
