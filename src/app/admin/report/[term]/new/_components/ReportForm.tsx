'use client';
import { Dispatch, SetStateAction } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { EditReport } from '@/types/report';
import {
  Body2,
  Flex,
  Input,
  MediaUpload,
  TextArea,
  usePortal,
} from 'ddingdong-design-system';
import { Loading } from '../../../../../../components/loading/Loading';
import ParticipantModal from './ParticipantModal';
import { useReportImage } from '../_hooks/useReportImage';
import { useReportInput } from '../_hooks/useReportInput';

type Props = {
  report: EditReport;
  setValue: Dispatch<SetStateAction<EditReport>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export default function ReportForm({ setValue, report, setIsEditing }: Props) {
  const { date, participants, place, content, startTime, endTime } = report;
  const { isOpen, openModal, closeModal } = usePortal();
  const { mediaPreviewUrls, mediaPreviewFiles, isLoading, handleFileChange } =
    useReportImage({ report, setValue, setIsEditing });
  const { handleChange, handleDateChange } = useReportInput({ setValue });

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="between"
        className="flex-col md:m-3 md:flex-row"
      >
        <Flex dir="col" className="w-full gap-4 md:w-2/3">
          <Flex alignItems="center" className="mb-3 flex-col gap-2 md:flex-row">
            <Datepicker
              value={date}
              onChange={handleDateChange}
              useRange={false}
              asSingle
              minDate={new Date(new Date().getFullYear(), 0, 1)}
              maxDate={new Date(new Date().getFullYear(), 11, 31)}
              inputClassName="w-full px-4 py-3 bg-white text-sm border-[1.5px] border-gray-100 rounded-xl md:pb-3 placeholder:text-sm outline-none md:text-base"
            />
            <Input
              name="place"
              type="text"
              placeholder="활동장소"
              value={place}
              onChange={handleChange}
              onClickReset={() => {}}
            />
          </Flex>
          <div>
            <div className="mb-3 flex items-center justify-between">
              <Body2 className="text-blue-500">활동 시간</Body2>
            </div>
            <Flex
              alignItems="center"
              className="mb-3 flex-col gap-2 md:flex-row"
            >
              <Input
                name="startTime"
                type="time"
                onClickReset={() => {}}
                value={startTime ?? ''}
                onChange={handleChange}
              />
              <Input
                name="endTime"
                type="time"
                onClickReset={() => {}}
                value={endTime ?? ''}
                onChange={handleChange}
              />
            </Flex>
          </div>

          <div onClick={openModal}>
            <Body2 className="text-blue-500">활동 참여 인원</Body2>
            <TextArea
              readOnly
              value={participants
                .filter((p) => p.name !== '')
                .map((p) => `${p.name} | ${p.department} | ${p.studentId}`)
                .join('\n')}
            />
          </div>

          <div>
            <Body2 className="text-blue-500">활동 내용</Body2>
            <TextArea name="content" value={content} onChange={handleChange} />
          </div>
        </Flex>

        <div className="h-1/2 w-full md:ml-2 md:w-1/2">
          {isLoading ? (
            <div className="flex w-full items-center justify-center">
              <Loading className="w-54" />
            </div>
          ) : (
            <MediaUpload
              acceptedFormats={['image/*', 'video/*']}
              previewUrls={mediaPreviewUrls}
              previewFiles={mediaPreviewFiles}
              onFileChange={handleFileChange}
            />
          )}
        </div>
      </Flex>
      <ParticipantModal
        data={participants}
        setData={setValue}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
}
