import { SectionFormField } from '@/app/_api/types/apply';

import { useQuestionReducer } from './useQuestionReducer';
import { useSectionReducer } from './useSectionReducer';

export function useFormFieldReducer(initialData?: {
  focusSection?: string;
  sections?: string[];
  formField?: SectionFormField[];
}) {
  const sectionState = useSectionReducer(
    initialData && (initialData.focusSection || initialData.sections)
      ? {
          focusSection: initialData.focusSection,
          sections: initialData.sections,
        }
      : undefined,
  );

  const questionState = useQuestionReducer(
    initialData?.formField && initialData.formField.length > 0
      ? { formField: initialData.formField }
      : undefined,
  );

  const handleAddSection = (section: string) => {
    sectionState.addSection(section);
    questionState.addSection(section);
  };

  const handleDeleteSection = (section: string) => {
    sectionState.deleteSection(section);
    questionState.deleteSection(section);
  };

  const handleUpdateSection = (oldName: string, newName: string) => {
    sectionState.updateSection(oldName, newName);
    questionState.updateSection(oldName, newName);
  };

  return {
    focusSection: sectionState.focusSection,
    sections: sectionState.sections,
    formField: questionState.formField ?? [],
    changeFocusSection: sectionState.setFocusSection,
    addSection: handleAddSection,
    deleteSection: handleDeleteSection,
    updateSection: handleUpdateSection,
    addQuestion: questionState.addQuestion,
    deleteQuestion: questionState.deleteQuestion,
    reorderQuestions: questionState.reorderQuestions,
    updateQuestion: questionState.updateQuestion,
  };
}
