import { AnswerItem, FileItem } from '@/types/apply';

export function isSingleType(
  type: string,
): type is 'TEXT' | 'FILE' | 'LONG_TEXT' {
  return type === 'TEXT' || type === 'FILE' || type === 'LONG_TEXT';
}

export function isFileItemType(
  answer: FileItem | AnswerItem,
): answer is FileItem {
  return Array.isArray(answer.answer);
}
