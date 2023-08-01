import { ChangeEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import { toast, Toaster } from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import AdminClubHeading from '@/components/admin-club/AdminClubHeading';
import ClubInfoForm from '@/components/admin-club/ClubInfoForm';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useUpdateMyClub } from '@/hooks/api/club/useUpdateMyClub';
import { ClubDetail } from '@/types/club';
import { isMissingData } from '@/utils/validator';

export default function Index() {
  const [{ token }] = useCookies();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [clubData, setClubData] = useState<ClubDetail>({
    id: 0,
    name: '',
    tag: '',
    category: '',
    leader: '',
    phoneNumber: '',
    location: '',
    isRecruit: false,
    recruitPeriod: { startDate: new Date(), endDate: new Date() },
    regularMeeting: '',
    introduction: '',
    activity: '',
    ideal: '',
    uploadFiles: uploadFile,
    token: token,
    // formUrl: '',
  });
  const {
    data: { data },
  } = useMyClub(token);
  const mutation = useUpdateMyClub();

  useEffect(() => {
    if (data) {
      setClubData(data);
    }
  }, [data]);
  console.log(data);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setClubData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleClickCancel() {
    setIsEditing(false);
    setClubData(data);
  }
  function createFormData(data: ClubDetail) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && key === 'recruitPeriod') {
        formData.set('recruitPeriod', value.toString());
      } else if (value !== null) {
        formData.set(key, value.toString());
      }
    });
    return formData;
  }

  function handleClickSubmit() {
    if (isMissingData(clubData))
      return toast.error('모든 항목을 입력해주세요.');
    setIsEditing(false);
    // const formData = new FormData();
    // formData.append('name', clubData.name);
    // formData.append('category', clubData.category);
    // formData.append('tag', clubData.tag);
    // formData.append('clubLeader', clubData.leader);
    // formData.append('phoneNumber', clubData.phoneNumber);
    // formData.append('location', clubData.location);
    // formData.append('recruitPeriod', clubData.recruitPeriod.toString());
    // formData.append('regularMeeting', clubData.regularMeeting);
    // formData.append('introduction', clubData.introduction);
    // formData.append('ideal', clubData.ideal);
    // formData.append('activity', clubData.activity);
    // formData.append('token', token);
    const formData = createFormData(clubData);
    mutation.mutate(formData);
  }
  return (
    <>
      <Head>
        <title>{`띵동 어드민 - ${clubData.name}`}</title>
      </Head>
      <div className=" flex items-end justify-between">
        <AdminClubHeading
          clubName={clubData.name}
          category={clubData.category}
          tag={clubData.tag}
          uploadFiles={clubData.uploadFiles}
          setValue={setClubData}
        />
        {isEditing ? (
          <div className="-mr-2 mb-2 font-semibold">
            <button
              className="mr-1 rounded-xl px-2 py-2 text-gray-500 transition-colors hover:text-gray-600"
              onClick={handleClickCancel}
            >
              취소
            </button>
            <button
              className={`ml-1 rounded-xl px-2 py-2 text-blue-500 transition-colors hover:text-blue-600  ${
                isMissingData(clubData) && `cursor-not-allowed  opacity-50`
              }`}
              onClick={handleClickSubmit}
            >
              확인
            </button>
          </div>
        ) : (
          <button
            className="mb-4 min-w-fit rounded-xl bg-blue-100 px-3.5 py-2 text-sm font-bold text-blue-500 transition-colors hover:bg-blue-200 md:mb-2 md:px-4 md:py-2.5 md:text-base"
            onClick={() => setIsEditing(true)}
          >
            정보 수정하기
          </button>
        )}
      </div>
      <form className="mt-6 md:mt-8">
        <ClubInfoForm
          clubLeader={clubData.leader}
          phoneNumber={clubData.phoneNumber}
          location={clubData.location}
          regularMeeting={clubData.regularMeeting}
          recruitPeriod={clubData.recruitPeriod}
          // formUrl={clubData.formUrl}
          setValue={setClubData}
          isEditing={isEditing}
        />
        <div className="mt-6 md:mt-8">
          <div className="text-lg font-bold md:text-xl">
            우리 동아리를 소개할게요
          </div>
          <TextareaAutosize
            name="introduction"
            minRows={4}
            value={clubData.introduction}
            disabled={!isEditing}
            onChange={handleChange}
            className={`${
              !isEditing && 'opacity-60'
            } mb-5 mt-2 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg`}
          />
          <div className="text-lg font-bold md:text-xl">이런 활동을 해요</div>
          <TextareaAutosize
            name="activity"
            minRows={2}
            value={clubData.activity}
            disabled={!isEditing}
            onChange={handleChange}
            className={`${
              !isEditing && 'opacity-60'
            } mb-5 mt-2 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg`}
          />
          <div className="text-lg font-bold md:text-xl">
            이런 분과 함께하고 싶어요
          </div>
          <TextareaAutosize
            name="ideal"
            minRows={2}
            value={clubData.ideal}
            disabled={!isEditing}
            onChange={handleChange}
            className={`${
              !isEditing && 'opacity-60'
            } mb-5 mt-2 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg`}
          />
        </div>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;
  const token = cookies?.split('token=')[1];
  return {
    props: {
      token,
    },
  };
};
