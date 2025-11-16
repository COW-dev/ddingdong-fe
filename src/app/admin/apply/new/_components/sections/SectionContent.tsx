'use client';

import { useMemo } from 'react';

import { Button } from 'ddingdong-design-system';

import { QuestionList } from '@/app/admin/apply/new/_components/question/QuestionList';
import { AddSectionModal } from '@/app/admin/apply/new/_components/sections/AddSectionModal';
import { DeleteSectionModal } from '@/app/admin/apply/new/_components/sections/DeleteSectionModal';
import { EditSectionModal } from '@/app/admin/apply/new/_components/sections/EditSectionModal';
import { SectionTabs } from '@/app/admin/apply/new/_components/sections/SectionTabs';

import { useFormFieldContext } from '../../_contexts/FormFieldContext';
import { useSectionModals } from '../../_hooks/useSectionModals';

type SectionContentProps = {
  readOnly?: boolean;
};

export function SectionContent({ readOnly = false }: SectionContentProps) {
  const {
    sections,
    focusSection,
    formField,
    changeFocusSection,
    deleteQuestion,
    addQuestion,
    addSection,
    deleteSection,
    updateSection,
  } = useFormFieldContext();

  const {
    isEditOpen,
    editingSection,
    handleEditSection,
    handleCloseEditSection,
    clearEditingSection,
    isDeleteOpen,
    deletingSection,
    handleDeleteSection,
    handleCloseDeleteSection,
    clearDeletingSection,
    isAddOpen,
    handleOpenAddSection,
    handleCloseAddSection,
  } = useSectionModals();

  const currentSectionData = useMemo(
    () => formField?.find((item) => item.section === focusSection),
    [formField, focusSection],
  );

  const handleAddQuestion = () => {
    if (focusSection) {
      addQuestion(focusSection);
    }
  };

  const handleAddSection = (sectionName: string) => {
    addSection(sectionName);
    changeFocusSection(sectionName);
  };

  const handleUpdateSection = (newName: string) => {
    updateSection(editingSection, newName);
    clearEditingSection();
  };
  const handleConfirmDeleteSection = () => {
    deleteSection(deletingSection);
    clearDeletingSection();
  };

  const filteredSections = useMemo(
    () => sections.filter((s) => s !== editingSection),
    [sections, editingSection],
  );

  return (
    <div className="mt-6">
      <SectionTabs
        sections={sections}
        focusSection={focusSection}
        onSectionChange={changeFocusSection}
        onAddSection={readOnly ? undefined : handleOpenAddSection}
        onEditSection={readOnly ? undefined : handleEditSection}
        onDeleteSection={readOnly ? undefined : handleDeleteSection}
        readOnly={readOnly}
      />
      <QuestionList
        focusSection={focusSection}
        sectionData={currentSectionData}
        deleteQuestion={readOnly ? () => {} : deleteQuestion}
        readOnly={readOnly}
      />
      {!readOnly && (
        <Button
          size="full"
          variant="primary"
          color="blue"
          className="mt-4"
          onClick={handleAddQuestion}
        >
          질문 추가하기
        </Button>
      )}
      {!readOnly && (
        <>
          <AddSectionModal
            isOpen={isAddOpen}
            onClose={handleCloseAddSection}
            onAddSection={handleAddSection}
            existingSections={sections}
          />
          <EditSectionModal
            isOpen={isEditOpen}
            onClose={handleCloseEditSection}
            onUpdateSection={handleUpdateSection}
            currentName={editingSection}
            existingSections={filteredSections}
          />
          <DeleteSectionModal
            isOpen={isDeleteOpen}
            onClose={handleCloseDeleteSection}
            onDelete={handleConfirmDeleteSection}
            sectionName={deletingSection}
          />
        </>
      )}
    </div>
  );
}
