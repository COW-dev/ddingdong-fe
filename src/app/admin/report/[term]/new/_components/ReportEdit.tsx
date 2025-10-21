'use client';
import { useRouter } from 'next/navigation';

import {
  Accordion,
  AccordionItem,
  DoubleButton,
  Button,
  Body2,
  Flex,
  Body3,
} from 'ddingdong-design-system';

import { useReport } from '../_hooks/useReport';
import { EditReport } from '@/types/report';

import Form from '../../[name]/_components/Form';

type ReportEditProps = {
  report?: [EditReport, EditReport];
  term: number;
};

function ReportEdit({ report }: ReportEditProps) {
  const router = useRouter();
  const isEditMode = !!report;

  const {
    uploadFileOne,
    setUploadFileOne,
    uploadFileTwo,
    setUploadFileTwo,
    setReportOne,
    reportOne,
    reportTwo,
    setReportTwo,
    submitCreate,
    submitUpdate,
    setIsEditing,
    isEditing,
  } = useReport(report ?? [EMPTY_DATA, EMPTY_DATA]);
  return (
    <form onSubmit={isEditMode ? submitUpdate : submitCreate}>
      <Accordion type="multiple" defaultValue={['1']}>
        <AccordionItem value="1" trigger={<Body3>활동1</Body3>}>
          <Form
            uploadFiles={uploadFileOne}
            report={reportOne}
            id={1}
            setValue={setReportOne}
            setImage={setUploadFileOne}
            setIsEditing={setIsEditing}
          />
        </AccordionItem>
        <AccordionItem value="2" trigger={<Body3>활동2</Body3>}>
          <Form
            uploadFiles={uploadFileTwo}
            report={reportTwo}
            id={2}
            setValue={setReportTwo}
            setImage={setUploadFileTwo}
            setIsEditing={setIsEditing}
          />
        </AccordionItem>
      </Accordion>
      <Flex justifyContent="center" className="m-auto mt-6 w-fit">
        {isEditMode ? (
          <DoubleButton
            left={
              <Button variant="tertiary" onClick={() => router.back()}>
                <Body2>취소</Body2>
              </Button>
            }
            right={
              <Button
                variant="primary"
                color="blue"
                type="submit"
                disabled={isEditing}
              >
                <Body2>수정하기</Body2>
              </Button>
            }
          />
        ) : (
          <Button
            variant="secondary"
            type="submit"
            color="blue"
            disabled={isEditing}
            className={`${
              isEditing &&
              'cursor-not-allowed bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            <Body2>생성하기</Body2>
          </Button>
        )}
      </Flex>
    </form>
  );
}

export default ReportEdit;

const participant = {
  name: '',
  studentId: '',
  department: '',
};

export const EMPTY_DATA = {
  term: 0,
  date: { startDate: null, endDate: null },
  place: '',
  startTime: '',
  endTime: '',
  uploadFiles: null,
  content: '',
  imageUrl: null,
  participants: [
    participant,
    participant,
    participant,
    participant,
    participant,
  ],
  imageId: null,
};
