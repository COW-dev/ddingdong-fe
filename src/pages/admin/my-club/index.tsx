import { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import AdminClubHeading from '@/components/admin-club/AdminClubHeading';
import ClubInfoForm from '@/components/admin-club/ClubInfoForm';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useUpdateMyClub } from '@/hooks/api/club/useUpdateMyClub';
import { ClubDetail } from '@/types/club';
const initialClubData: ClubDetail = {
  name: '',
  tag: '',
  category: '',
  leader: '',
  content: 'test',
  phoneNumber: '010-1234-1234',
  location: 'S0000',
  isRecruit: false,
  recruitPeriod: '',
  parsedRecruitPeriod: { startDate: '', endDate: '' },
  regularMeeting: '',
  introduction: '',
  imageUrls: [''],
  activity: '',
  ideal: '',
  uploadFiles: null,
  formUrl: '',
  token: '',
};
export default function Index() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [{ token }] = useCookies();
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [clubData, setClubData] = useState<ClubDetail>(initialClubData);
  const {
    data: { data },
  } = useMyClub(token);
  const mutation = useUpdateMyClub();

  useEffect(() => {
    if (data) {
      setClubData({ ...data });
      setIsInitialLoad(false);
    }
  }, []);

  //datapicker형식에 맞도록 변환
  useEffect(() => {
    if (data) {
      setClubData((prevClubData) => ({
        ...prevClubData,
        parsedRecruitPeriod: {
          startDate: prevClubData.recruitPeriod?.split('~')[0],
          endDate: prevClubData.recruitPeriod?.split('~')[1] || '',
        },
        token: token,
      }));
    }
  }, [isInitialLoad]);

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setClubData((prevClubData) => ({
      ...prevClubData,
      [name]: value,
    }));
  }

  function handleClickCancel() {
    setIsEditing(false);
    setClubData(data);
  }

  function handleClickSubmit() {
    setIsEditing(false);
    const formData = createFormData();
    return mutation.mutate(formData);
  }

  function createFormData() {
    const formData = new FormData();
    Object.entries(clubData).forEach(([key, value]) => {
      if (!excludedKeys.includes(key)) {
        formData.append(key, value === null ? '' : String(value));
      }
    });

    uploadFile && formData.append('uploadFiles', uploadFile, `uploadFiles`);
    formData.append(
      'imgUrls',
      clubData.imageUrls.length === 0 ? '' : clubData.imageUrls[0],
    );

    formData.append('recruitPeriod', generateRecruitPeriodString());
    formData.append('token', token);
    formData.append('clubLeader', clubData.leader);

    return formData;
  }

  //formdata생성을 위한 함수
  function generateRecruitPeriodString() {
    const { parsedRecruitPeriod } = clubData;
    return parsedRecruitPeriod?.startDate === ('' || null)
      ? ''
      : `${parsedRecruitPeriod?.startDate}~${parsedRecruitPeriod?.endDate}`;
  }

  const excludedKeys = [
    'uploadFiles',
    'recruitPeriod',
    'imageUrls',
    'parsedRecruitPeriod',
    'location',
    'phoneNumber',
  ];
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
            onChange={(e) => handleTextareaChange(e)}
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
            onChange={(e) => handleTextareaChange(e)}
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
            onChange={(e) => handleTextareaChange(e)}
            className={`${
              !isEditing && 'opacity-60'
            } mb-5 mt-2 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 p-4 text-base font-medium outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg`}
          />
        </div>
      </form>
    </>
  );
}
