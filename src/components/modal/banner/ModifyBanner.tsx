import { MODAL_TYPE, ModalProp } from '..';

export default function CreateBanner({ data, setModal }: ModalProp) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setModal(MODAL_TYPE.null);
  }

  return (
    <>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-3 w-full">
          <label className="inline-block w-20 font-semibold text-gray-500">
            제목
          </label>
          <input
            name="title"
            type="text"
            spellCheck={false}
            // value={clubName}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none"
            // onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-2 w-full ">
          <label className="inline-block w-20 font-semibold text-gray-500">
            부제목
          </label>
          <input
            name="subTitle"
            type="text"
            spellCheck={false}
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
          />
        </div>

        <div className="flex flex-row">
          <div className="mb-2 w-full ">
            <label className="inline-block w-20 font-semibold text-gray-500">
              배경색
            </label>
            <input
              name="color"
              type="color"
              spellCheck={false}
              className="h-[60%] w-[90%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
            />
          </div>
          <div className="mb-2 w-full">
            <label className="inline-block w-20 font-semibold text-gray-500">
              이미지
            </label>
            <input
              name="image"
              type="text"
              spellCheck={false}
              className="w-[100%] rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 outline-none md:px-5"
              // value={tag}
              // onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-500 py-4 font-bold text-white transition-colors hover:bg-blue-600 sm:mt-5 sm:py-4 sm:text-lg "
        >
          배너 생성하기
        </button>
      </form>
    </>
  );
}
