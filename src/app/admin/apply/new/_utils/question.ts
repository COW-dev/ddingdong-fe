import { FormField, SectionFormField } from '@/app/_api/types/apply';

export function getQuestionContentKey(
  questionData: FormField,
  index: number,
  section: SectionFormField,
): string {
  return `${questionData.id || index}-${section.section}-${questionData.type}`;
}

export function getCurrentOptions(questionData: FormField): string[] {
  return questionData.options || [];
}

export function canDragQuestion(section: SectionFormField): boolean {
  return section.questions.length > 1;
}

export function isDragOver(
  dragOverIndex: number | null,
  currentIndex: number,
): boolean {
  return dragOverIndex === currentIndex;
}
