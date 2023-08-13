import { type } from 'os';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Data from '@/assets/image1.jpeg';
import NeutralButton from '@/components/common/NeutralButton';
type Props = {
  fixId: number;
};
export default function Index({ fixId }: Props) {
  return (
    <div className="max-w-[650px] p-5">
      <div className="mt-7 flex justify-between text-2xl font-bold leading-tight md:mt-10 md:flex md:text-3xl">
        <div className="mb-14">Fix:Zone 동아리방 시설보수</div>
      </div>
      <div className=" m-auto w-[550px] overflow-hidden rounded-lg bg-gray-100 bg-opacity-90 shadow-xl ">
        <div className="p-3 px-5">
          <div className="py-2 text-xl  font-semibold">
            폭우로 인한 동아리방 누수피해 복구요청드립니다.
          </div>
          <div>의자 고장났습니다.</div>
        </div>
        <div className="mt-7 border-t border-gray-200 p-3 text-end text-xs text-gray-500">
          <div>너나들이</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={Data}
            width={550}
            height={500}
            alt="fixImage"
            className=" overflow-hidden rounded-md"
          />
        </div>
        <div className="mt-7 border-gray-500 p-3 text-end text-xs text-gray-500">
          <div>제출일자 : 2023-07-15 06:00</div>
          <div>동아리방 : S1353</div>
        </div>
      </div>
      <div className="mt-6 flex justify-end md:mt-8">
        <NeutralButton href="/fixzone">목록으로 돌아가기</NeutralButton>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context: {
  query: any;
}) => {
  const { id } = context.query;
  return {
    props: {
      fixId: id,
    },
  };
};
