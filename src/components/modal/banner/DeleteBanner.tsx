import { useCookies } from 'react-cookie';
import { useDeleteBanner } from '@/hooks/api/banner/useDeleteBanner';

type Props = {
  id: number;
  closeModal: () => void;
};
export default function DeleteBanner({ id, closeModal }: Props) {
  const deleteMutation = useDeleteBanner();
  const [cookies] = useCookies(['token']);

  function handleClickDelete() {
    deleteMutation.mutate({
      bannerId: id,
      token: cookies.token,
    });
    closeModal();
  }

  return (
    <>
      <div className="mb-2 w-full ">
        <label className="ml-5 inline-block w-full font-semibold text-gray-500">
          정말 삭제하시겠습니까?
        </label>
        <button
          className="mx-5 w-[40%] rounded-xl bg-red-400 py-4 font-bold text-white transition-colors hover:bg-red-500 sm:mt-5 sm:py-4 sm:text-lg "
          onClick={handleClickDelete}
        >
          확인
        </button>
        <button
          className="mx-5 w-[40%] rounded-xl bg-gray-200 py-4 font-bold text-white transition-colors hover:bg-gray-400 sm:mt-5 sm:py-4 sm:text-lg "
          onClick={closeModal}
        >
          취소
        </button>
      </div>
    </>
  );
}
