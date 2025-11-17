import { useReducer, useCallback } from 'react';

import { DEFAULT_SECTION } from '../../_utils/constants';

type SectionState = {
  focusSection: string;
  sections: string[];
};

type SectionAction =
  | { type: 'SET_FOCUS_SECTION'; payload: string }
  | { type: 'ADD_SECTION'; payload: string }
  | { type: 'DELETE_SECTION'; payload: string }
  | { type: 'UPDATE_SECTION'; payload: { oldName: string; newName: string } }
  | { type: 'SET_SECTIONS'; payload: string[] };

const initialState: SectionState = {
  focusSection: DEFAULT_SECTION,
  sections: [DEFAULT_SECTION],
};

function sectionReducer(
  state: SectionState,
  action: SectionAction,
): SectionState {
  switch (action.type) {
    case 'SET_FOCUS_SECTION':
      return { ...state, focusSection: action.payload };

    case 'ADD_SECTION':
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };

    case 'DELETE_SECTION':
      return {
        ...state,
        sections: state.sections.filter((s) => s !== action.payload),
        focusSection:
          state.focusSection === action.payload
            ? (state.sections.find((s) => s !== action.payload) ??
              DEFAULT_SECTION)
            : state.focusSection,
      };

    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map((s) =>
          s === action.payload.oldName ? action.payload.newName : s,
        ),
        focusSection:
          state.focusSection === action.payload.oldName
            ? action.payload.newName
            : state.focusSection,
      };

    default:
      return state;
  }
}

export function useSectionReducer(initialData?: Partial<SectionState>) {
  const [state, dispatch] = useReducer(sectionReducer, {
    ...initialState,
    ...initialData,
  });

  const setFocusSection = useCallback((section: string) => {
    dispatch({ type: 'SET_FOCUS_SECTION', payload: section });
  }, []);

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

  return {
    ...state,
    setFocusSection,
    addSection,
    deleteSection,
    updateSection,
  };
}
