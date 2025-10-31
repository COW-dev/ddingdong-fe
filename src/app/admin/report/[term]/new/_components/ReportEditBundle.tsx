'use client';
import { Accordion, AccordionItem, Body3 } from 'ddingdong-design-system';

import { EditReport } from '@/types/report';

import { useReport } from '../_hooks/useReport';

import EditButton from './EditButton';
import ReportForm from './ReportForm';

type Props = {
  report?: [EditReport, EditReport];
  term: number;
};

export default function ReportEditBundle({ report, term }: Props) {
  const isEditMode = !!report;

  const {
    reportOne,
    isEditing,
    reportTwo,
    setReportOne,
    setReportTwo,
    submitCreate,
    submitUpdate,
    setIsEditing,
  } = useReport(term, report);

  return (
    <form onSubmit={isEditMode ? submitUpdate : submitCreate}>
      <Accordion type="multiple" defaultValue={['1', '2']}>
        <AccordionItem value="1" trigger={<Body3>활동1</Body3>}>
          <ReportForm
            report={reportOne}
            setValue={setReportOne}
            setIsEditing={setIsEditing}
          />
        </AccordionItem>
        <AccordionItem value="2" trigger={<Body3>활동2</Body3>}>
          <ReportForm
            report={reportTwo}
            setValue={setReportTwo}
            setIsEditing={setIsEditing}
          />
        </AccordionItem>
      </Accordion>
      <EditButton disabled={isEditing} isEditMode={isEditMode} />
    </form>
  );
}
