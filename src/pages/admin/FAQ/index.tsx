import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import Heading from '@/components/common/Heading';
import FAQList from '@/components/faq/FAQList';
import { useAllFaq } from '@/hooks/api/faq/useAllFaqAdmin';
import { useCreateFaq } from '@/hooks/api/faq/useCreateFaq';

export default function Index() {
  const [cookies] = useCookies(['token', 'role']);
  const { token } = cookies;
  const { data: FAQ, refetch } = useAllFaq(token);
  const { mutate: createFaq, isLoading: isSaving } = useCreateFaq();

  const [isEditing, setIsEditing] = useState(false);
  const [newFAQs, setNewFAQs] = useState<{ question: string; reply: string }[]>(
    [],
  );
  //취소시 refetch
  //저장하기시 createFaq 호출
  //수정하기 삭제 다시 구현
  const addFAQ = () => {
    setNewFAQs([
      ...newFAQs,
      { question: '질문을 입력해주세요', reply: '답변을 입력해주세요' },
    ]);
  };

  const saveFAQ = () => {
    newFAQs.forEach((faq) => {
      createFaq({ ...faq, token });
    });
    setNewFAQs([]);
    setIsEditing(false);
  };

  return (
    <>
      <Head>
        <title>띵동 - FAQ</title>
      </Head>

      <div className="flex items-end justify-between">
        <Heading>FAQ 관리</Heading>
        {isEditing ? (
          <div>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-3 h-10 rounded-lg bg-gray-100 px-4.5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={saveFAQ}
              className={`ml-3 h-10 rounded-lg px-4.5 py-2 text-sm font-bold text-white 
                ${
                  isSaving
                    ? 'cursor-not-allowed bg-gray-500'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              disabled={isSaving}
            >
              저장하기
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="ml-3 h-10 rounded-lg bg-blue-100 px-4.5 py-2 text-sm font-bold text-blue-500 hover:bg-blue-200"
          >
            수정하기
          </button>
        )}
      </div>

      {isEditing && (
        <div className="flex w-full flex-row justify-end pt-6">
          <div
            onClick={addFAQ}
            className="flex w-16 cursor-pointer justify-end border-b-2 border-gray-600 pb-0 font-bold text-gray-600"
          >
            FAQ 추가
          </div>
        </div>
      )}

      <FAQList
        FAQ={FAQ}
        newFAQs={newFAQs}
        setNewFAQs={setNewFAQs}
        isEditing={isEditing}
        refetch={refetch}
      />
    </>
  );
}
