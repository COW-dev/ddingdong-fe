import { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import TextareaAutosize from 'react-textarea-autosize';
import AdminClubHeading from '@/components/admin-club/AdminClubHeading';
import ClubInfoForm from '@/components/admin-club/ClubInfoForm';
import UploadImage from '@/components/common/UploadImage';
import Loading from '@/components/loading/Loading';
import { useMyClub } from '@/hooks/api/club/useMyClub';
import { useUpdateMyClub } from '@/hooks/api/club/useUpdateMyClub';
import { usePresignedUrl } from '@/hooks/common/usePresigndUrl';
import { ClubDetail } from '@/types/club';

const initialClubData: ClubDetail = {
  name: '',
  tag: '',
  category: '',
  leader: '',
  phoneNumber: '010-1234-1234',
  location: 'S0000',
  isRecruit: false,
  startRecruitPeriod: '',
  endRecruitPeriod: '',
  parsedRecruitPeriod: { startDate: '', endDate: '' },
  regularMeeting: '',
  introduction: '',
  activity: '',
  ideal: '',
  profileImage: { id: '', originUrl: '', cdnUrl: '' },
  introductionImage: { id: '', originUrl: '', cdnUrl: '' },
  formUrl: '',
  token: '',
};

export default function Index() {
  const [clubData, setClubData] = useState<ClubDetail>(initialClubData);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [introductionImageFile, setIntroductionImageFile] =
    useState<File | null>(null);
  const [profileImageId, setProfileImageId] = useState<string | null>(null);
  const [introductionImageId, setIntroductionImageId] = useState<string | null>(
    null,
  );
  const [{ token }] = useCookies();

  const { data } = useMyClub(token);

  const mutation = useUpdateMyClub();
  const {
    getPresignedId: getProfilePresignedUrl,
    isLoading: isProfileLoading,
  } = usePresignedUrl(`profileImageFile`);
  const {
    getPresignedId: getIntroductionPresigned,
    isLoading: isIntroductionLoading,
  } = usePresignedUrl(`introductionImageFile`);

  useEffect(() => {
    if (data) {
      setClubData(data.data);
      setIsInitialLoad(false);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setClubData((prevClubData) => ({
        ...prevClubData,
        parsedRecruitPeriod: {
          startDate: prevClubData.startRecruitPeriod?.split(' ')[0] || '',
          endDate: prevClubData.endRecruitPeriod?.split(' ')[0] || '',
        },
        token: token,
      }));
    }
  }, [data, isInitialLoad, token]);

  useEffect(() => {
    const fetchIntroductionImageId = async () => {
      if (introductionImageFile) {
        const id = await getIntroductionPresigned(introductionImageFile);
        setIntroductionImageId(id);
      }
    };

    fetchIntroductionImageId();
  }, [getIntroductionPresigned, introductionImageFile]);

  useEffect(() => {
    const fetchProfileImageId = async () => {
      if (profileImageFile) {
        const id = await getProfilePresignedUrl(profileImageFile);
        setProfileImageId(id);
      }
    };

    fetchProfileImageId();
  }, [getProfilePresignedUrl, profileImageFile]);

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setClubData((prevClubData) => ({
      ...prevClubData,
      [name]: value,
    }));
  }

  function handleClickCancel() {
    setIsEditing(false);
    data && setClubData(data.data);
  }

  function handleClickSubmit() {
    setIsEditing(false);
    const requestData = {
      name: clubData.name,
      tag: clubData.tag,
      category: clubData.category,
      location: clubData.location,
      clubLeader: clubData.leader,
      phoneNumber: clubData.phoneNumber,
      startRecruitPeriod: clubData.parsedRecruitPeriod?.startDate
        ? `${clubData.parsedRecruitPeriod?.startDate} 00:00`
        : null,
      endRecruitPeriod: clubData.parsedRecruitPeriod?.endDate
        ? `${clubData.parsedRecruitPeriod?.endDate} 00:00`
        : null,
      regularMeeting: '',
      introduction: clubData.introduction,
      activity: clubData.activity,
      profileImageId: profileImageFile
        ? profileImageId
        : clubData.profileImage.id || null,
      introductionImageId: introductionImageFile
        ? introductionImageId
        : clubData.introductionImage.id || null,
      ideal: clubData.ideal,
      formUrl: clubData.formUrl ?? null,
      token: token,
    };

    return mutation.mutate(requestData);
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
          isLoading={isProfileLoading}
          profileImage={profileImageFile}
          profileImageUrl={clubData.profileImage}
          setValue={setClubData}
          setProfileImage={setProfileImageFile}
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
              className={`ml-1 rounded-xl px-2 py-2 text-blue-500 transition-colors hover:text-blue-600 ${
                isProfileLoading ||
                (isIntroductionLoading && 'cursor-not-allowed text-gray-500')
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
          parsedRecruitPeriod={clubData?.parsedRecruitPeriod}
          formUrl={clubData.formUrl}
          setValue={setClubData}
          isEditing={isEditing}
        />
        <div className="mt-6 md:mt-8">
          <div className="text-lg font-bold md:text-xl">동아리 소개 이미지</div>
          <div className="text-xs text-gray-400 md:flex">
            <div> * 동아리 소개사진을 작성하는란 입니다. </div>
            <div className="px-2">
              대표사진&#40;로고&#41;은 최상단에서 변경해주세요
            </div>
          </div>
          {isEditing ? (
            isIntroductionLoading ? (
              <div className=" flex w-full items-center justify-center">
                <Loading className="w-54" />
              </div>
            ) : (
              <UploadImage
                image={introductionImageFile}
                setImage={setIntroductionImageFile}
                imageUrls={clubData.introductionImage}
                setNoticeData={setClubData}
                urlsName={`introduceImageUrls`}
              />
            )
          ) : introductionImageFile || clubData.introductionImage?.originUrl ? (
            <Image
              src={
                introductionImageFile
                  ? URL.createObjectURL(introductionImageFile)
                  : clubData.introductionImage?.originUrl
              }
              width={1000}
              priority
              className="my-4 max-h-[50vh] object-scale-down"
              height={1000}
              alt="동아리 소개 이미지"
            />
          ) : (
            <div className="mb-5 mt-2 flex h-30 w-full flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-4 outline-none md:mb-6 md:mt-3 md:p-5 md:text-lg">
              <div className="text-sm text-gray-500">
                동아리 소개 이미지가 없습니다.
              </div>
            </div>
          )}

          <div className=" text-lg font-bold md:text-xl">
            우리 동아리를 소개할게요
          </div>
          <TextareaAutosize
            name="introduction"
            minRows={4}
            value={clubData?.introduction}
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
            value={clubData?.activity}
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
            value={clubData?.ideal}
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
