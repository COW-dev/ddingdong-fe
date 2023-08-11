import { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import AdminClubHeading from '@/components/admin-club/AdminClubHeading';
import ClubInfoForm from '@/components/admin-club/ClubInfoForm';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useUpdateMyClub } from '@/hooks/api/club/useUpdateMyClub';
import { ClubDetail } from '@/types/club';

export default function Index() {
  const [init, setInit] = useState(true);
  const [{ token }] = useCookies();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
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
    recruitPeriod: '',
    parsedRecruitPeriod: { startDate: '2023-00-00', endDate: '2023-00-00' },
    regularMeeting: '',
    introduction: '',
    imageUrls: [''],
    activity: '',
    ideal: '',
    uploadFiles: null,
    formUrl: '',
    token: token,
  });
  const {
    data: { data },
  } = useMyClub(token);

  const mutation = useUpdateMyClub();
  const parsed = {
    startDate: clubData.recruitPeriod.split(`~`)[0],
    endDate: clubData.recruitPeriod.split(`~`)[1] ?? '',
  };

  useEffect(() => {
    if (data) {
      setClubData({
        ...data,
      });
      setInit(false);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setClubData({
        ...data,
        parsedRecruitPeriod: parsed,
      });
    }
  }, [init]);

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
      if (
        key !== 'uploadFiles' &&
        key !== 'recruitPeriod' &&
        key !== 'imageUrls'
      ) {
        if (value === null) value = '';
        formData.append(key, String(value));
      }
    });
    const recruitPeriod =
      clubData === null || clubData?.parsedRecruitPeriod?.startDate === null
        ? ``
        : `${clubData?.parsedRecruitPeriod?.startDate}~${clubData?.parsedRecruitPeriod?.endDate}`;

    uploadFile && formData.append('uploadFiles', uploadFile, `uploadFiles`);
    clubData.imageUrls.length === 0 && formData.append('uploadFiles', '');
    formData.append('recruitPeriod', recruitPeriod);
    formData.append('token', token);
    formData.append('clubLeader', clubData.leader);
    return mutation.mutate(formData);
  }

  return (
    <>
      <Head>
        <title>{`띵동 어드민 - ${clubData?.name}`}</title>
      </Head>
      <div className=" flex items-end justify-between">
        <AdminClubHeading
          clubName={clubData.name}
          category={clubData.category}
          tag={clubData.tag}
          uploadFiles={clubData.uploadFiles}
          imageUrls={clubData.imageUrls}
          setValue={setClubData}
          setUploadFile={setUploadFile}
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
              className="ml-1 rounded-xl px-2 py-2 text-blue-500 transition-colors hover:text-blue-600"
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
          parsedRecruitPeriod={clubData?.parsedRecruitPeriod}
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
