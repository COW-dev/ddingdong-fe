import { ChangeEvent, useEffect, useState } from 'react';
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
  const [uploadFile, setUploadFile] = useState<File[] | string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [clubData, setClubData] = useState<ClubDetail>({
    name: '',
    tag: '',
    category: '',
    leader: '',
    content: 'test',
    phoneNumber: '',
    location: '',
    isRecruit: false,
    recruitPeriod: { startDate: new Date(), endDate: new Date() },
    regularMeeting: '',
    introduction: '',
    activity: '',
    ideal: '',
    imageUrls: uploadFile,
    formUrl: '',
    token: token,
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
  function handleClickSubmit() {
    setIsEditing(false);
    setClubData({
      ...clubData,
      isRecruit: false,
    });
    const formData = new FormData();

    Object.entries(clubData).forEach(([key, value]) => {
      if (key !== 'uploadFiles' && key !== 'recruitPeriod') {
        formData.append(key, value.toString());
      } else if (clubData.imageUrls !== undefined) {
        formData.append('uploadFiles', clubData.imageUrls.toString());
      }
    });
    const recruitPeriod = `${clubData.recruitPeriod.startDate?.toString()}~${clubData.recruitPeriod.endDate?.toString()}`;
    formData.append('recruitPeriod', recruitPeriod);
    formData.append('token', token);
    return mutation.mutate(formData);
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
          imageUrls={clubData.imageUrls}
          setValue={setClubData}
          isEditing={isEditing}
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
          leader={clubData.leader}
          phoneNumber={clubData.phoneNumber}
          location={clubData.location}
          regularMeeting={clubData.regularMeeting}
          recruitPeriod={clubData.recruitPeriod}
          formUrl={clubData.formUrl}
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
            className={`${
              !isEditing && 'opacity-60'
            } mb-5 mt-2 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg`}
          />
        </div>
      </form>
    </>
  );
}
