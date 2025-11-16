import {
  Body3,
  Flex,
  IconButton,
  Input,
  Switch,
} from 'ddingdong-design-system';

import {
  FormField,
  QuestionType,
  SectionFormField,
} from '@/app/_api/types/apply';
import { useFormFieldContext } from '@/app/admin/apply/new/_contexts/FormFieldContext';

import { useQuestionHandlers } from '../../_hooks/useQuestionHandlers';
import {
  canDragQuestion,
  getCurrentOptions,
  getQuestionContentKey,
  isDragOver,
} from '../../_utils/question';
import { questionTypeMap } from '../questionTypes';

import { QuestionTypeSelect } from './QuestionTypeSelect';

type QuestionProps = {
  index: number;
  questionData: FormField;
  section: SectionFormField;
  deleteQuestion: (sectionName: string | undefined, index: number) => void;
  canDelete: boolean;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent, index: number) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: () => void;
  isDragging: boolean;
  dragOverIndex: number | null;
  readOnly?: boolean;
};

function QuestionComponent({
  index,
  section,
  questionData,
  deleteQuestion,
  canDelete,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
  dragOverIndex,
  readOnly = false,
}: QuestionProps) {
  const { updateQuestion } = useFormFieldContext();
  const {
    handleInputChange,
    resetInputValue,
    handleTypeChange,
    handleSwitchChange,
  } = useQuestionHandlers(index, section);

  const QuestionContent = questionTypeMap[questionData.type as QuestionType];
  const currentOptions = getCurrentOptions(questionData);
  const questionContentKey = getQuestionContentKey(
    questionData,
    index,
    section,
  );
  const isDragOverState = isDragOver(dragOverIndex, index);
  const isBeingDragged = isDragging;
  const canDrag = canDragQuestion(section);

  const handleDragStartInternal = (e: React.DragEvent) => {
    if (canDrag && onDragStart) {
      onDragStart(e, index);
    }
  };
  const handleOptionsChange = (options: string[]) => {
    updateQuestion(section.section, index, 'options', options);
  };

  return (
    <Flex
      dir="col"
      draggable={readOnly ? false : canDrag}
      onDragStart={readOnly ? undefined : handleDragStartInternal}
      onDragOver={(e) => {
        if (canDrag && !readOnly && onDragOver) {
          e.preventDefault();
          onDragOver(e, index);
        }
      }}
      onDrop={(e) => {
        if (canDrag && !readOnly && onDrop) {
          e.preventDefault();
          onDrop(e, index);
        }
      }}
      onDragEnd={readOnly ? undefined : canDrag ? onDragEnd : undefined}
      className={`relative mb-3 box-border rounded-xl border border-gray-200 p-7 px-6 transition-all ${
        isDragOverState
          ? 'border-blue-500 bg-blue-50'
          : isBeingDragged
            ? 'opacity-50'
            : canDrag && !readOnly
              ? 'cursor-move hover:border-gray-300'
              : ''
      }`}
    >
      {canDrag && !readOnly && (
        <div
          className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab p-2 active:cursor-grabbing"
          draggable={false}
        >
          <IconButton
            iconName="etc"
            color="gray"
            size={20}
            className="pointer-events-none rotate-90 cursor-grab active:cursor-grabbing"
          />
        </div>
      )}
      <Flex
        dir="row"
        gap={3}
        className="flex-wrap md:flex-nowrap"
        draggable={false}
      >
        <div className="flex-1" draggable={false}>
          <Input
            placeholder="질문을 입력해 주세요."
            value={questionData.question || ''}
            onChange={handleInputChange}
            onClickReset={resetInputValue}
            className="w-full"
            disabled={readOnly}
          />
        </div>
        <Flex className="w-1/3" draggable={false}>
          <QuestionTypeSelect
            value={questionData.type as QuestionType}
            onChange={handleTypeChange}
            disabled={readOnly}
          />
        </Flex>
      </Flex>

      <div className="border-b border-gray-200 py-4" draggable={false}>
        <QuestionContent
          key={questionContentKey}
          index={index}
          options={currentOptions}
          section={section}
          onOptionsChange={handleOptionsChange}
          readOnly={readOnly}
        />
      </div>

      <Flex
        alignItems="center"
        justifyContent="end"
        gap={3}
        className="w-full pt-4"
        draggable={false}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          gap={2}
          className="w-full"
        >
          <Body3 className="text-sm font-medium text-gray-500">필수</Body3>
          <Switch
            checked={questionData.required}
            onCheckedChange={handleSwitchChange}
            disabled={readOnly}
          />
        </Flex>
        {canDelete && !readOnly && (
          <IconButton
            iconName="trash"
            color="gray"
            size={20}
            className="cursor-pointer text-sm text-gray-500"
            onClick={() => deleteQuestion(section.section, index)}
          />
        )}
      </Flex>
    </Flex>
  );
}

export const Question = QuestionComponent;
