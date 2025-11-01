'use client';
import { Dispatch, SetStateAction } from 'react';

import {
  Flex,
  Input,
  MediaUpload,
  TextArea,
  usePortal,
} from 'ddingdong-design-system';
import Datepicker from 'react-tailwindcss-datepicker';

import { Report } from '@/app/_api/types/report';

import { Loading } from '../../../../../../components/loading/Loading';
import {
  ReportFormContentContainer,
  ReportFormContentWapper,
  ReportFormContiner,
} from '../_containers/ReportFormContainer';
import { useReportImage } from '../_hooks/useReportImage';
import { useReportInput } from '../_hooks/useReportInput';

import ParticipantModal from './ParticipantModal';

type Props = {
  report: Report;
  setValue: Dispatch<SetStateAction<Report>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function ReportForm({ setValue, report, setIsEditing }: Props) {
  const { date, participants, place, startTime, endTime, content } = report;
  const { isOpen, openModal, closeModal } = usePortal();
  const { mediaPreviewUrls, mediaPreviewFiles, isLoading, handleFileChange } =
    useReportImage({ report, setValue, setIsEditing });
  const { handleChange, handleDateChange, handleReset } = useReportInput({
    setValue,
  });

  return (
    <>
      <ReportFormContiner>
        <Flex dir="col" gap={6} className="w-full grow md:min-w-1/2">
          <ReportFormContentContainer>
            <ReportFormContentWapper>
              <Datepicker
                value={date}
                onChange={handleDateChange}
                popupClassName="md:max-w-[308px] md:w-[308px] w-full transition-all ease-out duration-300 absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm translate-y-4 opacity-0 hidden customDatePickerWidth"
                useRange={false}
                asSingle
                minDate={new Date(new Date().getFullYear(), 0, 1)}
                maxDate={new Date(new Date().getFullYear(), 11, 31)}
                inputClassName="w-full rounded-xl border-none bg-white px-4 py-3.5 outline-1 outline-gray-200 focus:ring-4 focus:ring-blue-200 focus:outline-blue-500"
              />
              <Input
                name="place"
                type="text"
                placeholder="활동장소"
                value={place ?? ''}
                onChange={handleChange}
                onClickReset={() => handleReset('place')}
              />
            </ReportFormContentWapper>
          </ReportFormContentContainer>
          <ReportFormContentContainer title="활동시간">
            <ReportFormContentWapper>
              <Input
                name="startTime"
                type="time"
                onClickReset={() => handleReset('startTime')}
                value={startTime ?? ''}
                onChange={handleChange}
                className={startTime ? 'customHideClock' : ''}
              />
              <Input
                name="endTime"
                type="time"
                onClickReset={() => handleReset('endTime')}
                value={endTime ?? ''}
                onChange={handleChange}
                className={endTime ? 'customHideClock' : ''}
              />
            </ReportFormContentWapper>
          </ReportFormContentContainer>
          <ReportFormContentContainer title="활동 참여 인원">
            <TextArea
              readOnly
              onClick={openModal}
              rows={5}
              value={participants
                .filter((p) => p.name !== '')
                .map((p) => `${p.name} | ${p.department} | ${p.studentId}`)
                .join('\n')}
            />
          </ReportFormContentContainer>
          <ReportFormContentContainer title="활동 내용">
            <TextArea
              name="content"
              value={content ?? ''}
              onChange={handleChange}
            />
          </ReportFormContentContainer>
        </Flex>
        {isLoading ? (
          <Flex alignItems="center">
            <Loading className="w-54" />
          </Flex>
        ) : (
          <MediaUpload
            acceptedFormats={['image/*', 'video/*']}
            previewUrls={mediaPreviewUrls}
            previewFiles={mediaPreviewFiles}
            onFileChange={handleFileChange}
            className="flex items-center justify-center md:h-118"
          />
        )}
      </ReportFormContiner>
      <ParticipantModal
        data={participants}
        setData={setValue}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
}
