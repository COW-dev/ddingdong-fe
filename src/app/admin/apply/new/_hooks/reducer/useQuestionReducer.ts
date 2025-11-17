import { useReducer, useCallback } from 'react';

import { FormField, SectionFormField } from '@/app/_api/types/apply';

import { DEFAULT_SECTION } from '../../_utils/constants';

function generateQuestionId(): string {
  return `question-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function ensureQuestionId(question: FormField): FormField {
  return question.id ? question : { ...question, id: generateQuestionId() };
}

type QuestionState = {
  formField: SectionFormField[];
};

type QuestionAction =
  | { type: 'ADD_SECTION'; payload: string }
  | { type: 'DELETE_SECTION'; payload: string }
  | { type: 'UPDATE_SECTION'; payload: { oldName: string; newName: string } }
  | { type: 'ADD_QUESTION'; payload: { section: string } }
  | {
      type: 'DELETE_QUESTION';
      payload: { section: string; questionIndex: number };
    }
  | {
      type: 'REORDER_QUESTIONS';
      payload: { section: string; fromIndex: number; toIndex: number };
    }
  | {
      type: 'UPDATE_QUESTION';
      payload: {
        section: string;
        questionIndex: number;
        field: keyof FormField;
        value: FormField[keyof FormField];
      };
    }
  | { type: 'SET_FORM_FIELD'; payload: SectionFormField[] };

const initialState: QuestionState = {
  formField: [
    {
      section: DEFAULT_SECTION,
      questions: [
        ensureQuestionId({
          question: '',
          type: 'RADIO',
          options: ['옵션1'],
          required: true,
          order: 1,
          section: DEFAULT_SECTION,
        }),
      ],
    },
  ],
};

function questionReducer(
  state: QuestionState,
  action: QuestionAction,
): QuestionState {
  switch (action.type) {
    case 'ADD_SECTION':
      return {
        ...state,
        formField: [
          ...state.formField,
          {
            section: action.payload,
            questions: [
              ensureQuestionId({
                question: '',
                type: 'RADIO',
                options: ['옵션1'],
                required: true,
                order: 1,
                section: action.payload,
              }),
            ],
          },
        ],
      };

    case 'DELETE_SECTION':
      return {
        ...state,
        formField: state.formField.filter((s) => s.section !== action.payload),
      };

    case 'UPDATE_SECTION':
      return {
        ...state,
        formField: state.formField.map((section) =>
          section.section === action.payload.oldName
            ? {
                ...section,
                section: action.payload.newName,
                questions: section.questions.map((q) => ({
                  ...q,
                  section: action.payload.newName,
                })),
              }
            : section,
        ),
      };

    case 'ADD_QUESTION': {
      return {
        ...state,
        formField: state.formField.map((section) =>
          section.section === action.payload.section
            ? {
                ...section,
                questions: [
                  ...section.questions,
                  ensureQuestionId({
                    question: '',
                    type: 'RADIO',
                    options: ['옵션1'],
                    required: true,
                    order: section.questions.length + 1,
                    section: section.section,
                  }),
                ],
              }
            : section,
        ),
      };
    }

    case 'DELETE_QUESTION':
      return {
        ...state,
        formField: state.formField.map((section) =>
          section.section === action.payload.section
            ? {
                ...section,
                questions: section.questions
                  .filter(
                    (_, qIndex) => qIndex !== action.payload.questionIndex,
                  )
                  .map((question, newIndex) => ({
                    ...question,
                    order: newIndex + 1,
                  })),
              }
            : section,
        ),
      };

    case 'REORDER_QUESTIONS': {
      const { section, fromIndex, toIndex } = action.payload;
      return {
        ...state,
        formField: state.formField.map((s) =>
          s.section === section
            ? {
                ...s,
                questions: (() => {
                  const newQuestions = [...s.questions];
                  const [movedQuestion] = newQuestions.splice(fromIndex, 1);
                  newQuestions.splice(toIndex, 0, movedQuestion);
                  return newQuestions.map((q, index) => ({
                    ...q,
                    order: index + 1,
                  }));
                })(),
              }
            : s,
        ),
      };
    }

    case 'UPDATE_QUESTION':
      return {
        ...state,
        formField: state.formField.map((section) =>
          section.section === action.payload.section
            ? {
                ...section,
                questions: section.questions.map((q, qIndex) =>
                  qIndex === action.payload.questionIndex
                    ? { ...q, [action.payload.field]: action.payload.value }
                    : q,
                ),
              }
            : section,
        ),
      };

    case 'SET_FORM_FIELD':
      // 외부에서 설정된 데이터에도 ID가 없으면 생성
      return {
        ...state,
        formField: action.payload.map((section) => ({
          ...section,
          questions: section.questions.map(ensureQuestionId),
        })),
      };

    default:
      return state;
  }
}

export function useQuestionReducer(initialData?: Partial<QuestionState>) {
  const [state, dispatch] = useReducer(questionReducer, {
    ...initialState,
    ...(initialData?.formField && {
      formField: initialData.formField,
    }),
  });

  const addQuestion = useCallback((section: string) => {
    dispatch({ type: 'ADD_QUESTION', payload: { section } });
  }, []);

  const deleteQuestion = useCallback(
    (section: string, questionIndex: number) => {
      dispatch({
        type: 'DELETE_QUESTION',
        payload: { section, questionIndex },
      });
    },
    [],
  );

  const updateQuestion = useCallback(
    (
      section: string,
      questionIndex: number,
      field: keyof FormField,
      value: FormField[keyof FormField],
    ) => {
      dispatch({
        type: 'UPDATE_QUESTION',
        payload: { section, questionIndex, field, value },
      });
    },
    [],
  );

  const addSection = useCallback((section: string) => {
    dispatch({ type: 'ADD_SECTION', payload: section });
  }, []);

  const deleteSection = useCallback((section: string) => {
    dispatch({ type: 'DELETE_SECTION', payload: section });
  }, []);

  const updateSection = useCallback((oldName: string, newName: string) => {
    dispatch({
      type: 'UPDATE_SECTION',
      payload: { oldName, newName },
    });
  }, []);

  const reorderQuestions = useCallback(
    (section: string, fromIndex: number, toIndex: number) => {
      dispatch({
        type: 'REORDER_QUESTIONS',
        payload: { section, fromIndex, toIndex },
      });
    },
    [],
  );

  return {
    ...state,
    addSection,
    deleteSection,
    updateSection,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    reorderQuestions,
  };
}
