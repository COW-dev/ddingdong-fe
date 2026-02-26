import { toast } from 'react-hot-toast';

export const shareCurrentLink = async () => {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('링크가 복사되었어요.');
    } else {
      toast.error('링크 복사에 실패했어요.');
    }
  } catch {
    toast.error('링크 복사에 실패했어요.');
  }
};
