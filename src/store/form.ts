import { create } from 'zustand';
import { FormState, FormField } from '@/types/form';

interface FormStore {
  forms: Record<string, FormState>;
  originalForms: Record<string, FormState>;
  modifiedForms: Set<string>;

  mode: Record<string, 'view' | 'edit'>;
  focusSection: Record<string, string>;

  setServerForm: (formId: string, formState: FormState) => void;
  getForm: (formId: string) => FormState | undefined;
  updateFormField: (formId: string, field: keyof FormState, value: any) => void;

  isModified: (formId: string) => boolean;
  resetToOriginal: (formId: string) => void;
  saveChanges: (formId: string) => void;

  createNewForm: () => string;
  updateFormId: (oldId: string, newId: number) => void;
  removeForm: (formId: string) => void;

  setMode: (formId: string, mode: 'view' | 'edit') => void;
  getMode: (formId: string) => 'view' | 'edit';
  setFocusSection: (formId: string, section: string) => void;
  getFocusSection: (formId: string) => string;

  addField: (formId: string, field: FormField) => void;
  deleteField: (formId: string, section: string, index: number) => void;
  updateField: (
    formId: string,
    fieldIndex: number,
    field: Partial<FormField>,
  ) => void;
}

const initialFormState: FormState = {
  title: '',
  description: '',
  hasInterview: false,
  sections: ['공통'],
  startDate: null,
  endDate: null,
  formFields: [],
};

export const useFormStore = create<FormStore>((set, get) => ({
  forms: {},
  originalForms: {},
  modifiedForms: new Set(),
  mode: {},
  focusSection: {},

  setServerForm: (formId, formState) =>
    set((state) => ({
      forms: { ...state.forms, [formId]: formState },
      originalForms: { ...state.originalForms, [formId]: formState },
      modifiedForms: new Set(
        Array.from(state.modifiedForms).filter((id) => id !== formId),
      ),
      mode: { ...state.mode, [formId]: 'view' },
      focusSection: { ...state.focusSection, [formId]: '공통' },
    })),

  getForm: (formId) => get().forms[formId],

  updateFormField: (formId, field, value) =>
    set((state) => {
      const currentForm = state.forms[formId];
      if (!currentForm) return state;

      const updatedForm = { ...currentForm, [field]: value };
      const isModified =
        JSON.stringify(updatedForm) !==
        JSON.stringify(state.originalForms[formId]);

      return {
        forms: { ...state.forms, [formId]: updatedForm },
        modifiedForms: isModified
          ? new Set([...Array.from(state.modifiedForms), formId])
          : new Set(
              Array.from(state.modifiedForms).filter((id) => id !== formId),
            ),
      };
    }),

  isModified: (formId) => get().modifiedForms.has(formId),

  resetToOriginal: (formId) =>
    set((state) => {
      const originalForm = state.originalForms[formId];
      if (!originalForm) return state;

      return {
        forms: { ...state.forms, [formId]: originalForm },
        modifiedForms: new Set(
          Array.from(state.modifiedForms).filter((id) => id !== formId),
        ),
      };
    }),

  saveChanges: (formId) =>
    set((state) => ({
      originalForms: { ...state.originalForms, [formId]: state.forms[formId] },
      modifiedForms: new Set(
        Array.from(state.modifiedForms).filter((id) => id !== formId),
      ),
    })),

  createNewForm: () => {
    const tempId = `temp_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    set((state) => ({
      forms: { ...state.forms, [tempId]: initialFormState },
      originalForms: { ...state.originalForms, [tempId]: initialFormState },
      modifiedForms: new Set([...Array.from(state.modifiedForms), tempId]),
      mode: { ...state.mode, [tempId]: 'edit' },
      focusSection: { ...state.focusSection, [tempId]: '공통' },
    }));

    return tempId;
  },

  updateFormId: (oldId, newId) =>
    set((state) => {
      const formState = state.forms[oldId];
      const originalForm = state.originalForms[oldId];
      const mode = state.mode[oldId];
      const focusSection = state.focusSection[oldId];

      if (!formState) return state;

      const newForms = { ...state.forms };
      const newOriginalForms = { ...state.originalForms };
      const newMode = { ...state.mode };
      const newFocusSection = { ...state.focusSection };

      delete newForms[oldId];
      delete newOriginalForms[oldId];
      delete newMode[oldId];
      delete newFocusSection[oldId];

      newForms[newId.toString()] = formState;
      newOriginalForms[newId.toString()] = originalForm;
      newMode[newId.toString()] = mode;
      newFocusSection[newId.toString()] = focusSection;

      return {
        forms: newForms,
        originalForms: newOriginalForms,
        mode: newMode,
        focusSection: newFocusSection,
        modifiedForms: new Set(
          Array.from(state.modifiedForms).filter((id) => id !== oldId),
        ),
      };
    }),

  removeForm: (formId) =>
    set((state) => {
      const newForms = { ...state.forms };
      const newOriginalForms = { ...state.originalForms };
      const newMode = { ...state.mode };
      const newFocusSection = { ...state.focusSection };

      delete newForms[formId];
      delete newOriginalForms[formId];
      delete newMode[formId];
      delete newFocusSection[formId];

      return {
        forms: newForms,
        originalForms: newOriginalForms,
        mode: newMode,
        focusSection: newFocusSection,
        modifiedForms: new Set(
          Array.from(state.modifiedForms).filter((id) => id !== formId),
        ),
      };
    }),

  setMode: (formId, mode) =>
    set((state) => ({
      mode: { ...state.mode, [formId]: mode },
    })),

  getMode: (formId) => get().mode[formId] || 'view',

  setFocusSection: (formId, section) =>
    set((state) => ({
      focusSection: { ...state.focusSection, [formId]: section },
    })),

  getFocusSection: (formId) => get().focusSection[formId] || '공통',

  addField: (formId, field) =>
    set((state) => {
      const currentForm = state.forms[formId];
      if (!currentForm) return state;

      const newField = {
        ...field,
        order: currentForm.formFields.length + 1,
      };

      const updatedForm = {
        ...currentForm,
        formFields: [...currentForm.formFields, newField],
      };

      const isModified =
        JSON.stringify(updatedForm) !==
        JSON.stringify(state.originalForms[formId]);

      return {
        forms: { ...state.forms, [formId]: updatedForm },
        modifiedForms: isModified
          ? new Set([...Array.from(state.modifiedForms), formId])
          : new Set(
              Array.from(state.modifiedForms).filter((id) => id !== formId),
            ),
      };
    }),

  deleteField: (formId, section, index) =>
    set((state) => {
      const currentForm = state.forms[formId];
      if (!currentForm) return state;

      const updatedFormFields = currentForm.formFields.filter(
        (field, fieldIndex) =>
          !(field.section === section && fieldIndex === index),
      );

      const updatedForm = {
        ...currentForm,
        formFields: updatedFormFields,
      };

      const isModified =
        JSON.stringify(updatedForm) !==
        JSON.stringify(state.originalForms[formId]);

      return {
        forms: { ...state.forms, [formId]: updatedForm },
        modifiedForms: isModified
          ? new Set([...Array.from(state.modifiedForms), formId])
          : new Set(
              Array.from(state.modifiedForms).filter((id) => id !== formId),
            ),
      };
    }),

  updateField: (formId, fieldIndex, field) =>
    set((state) => {
      const currentForm = state.forms[formId];
      if (!currentForm) return state;

      const updatedFormFields = currentForm.formFields.map((f, index) =>
        index === fieldIndex ? { ...f, ...field } : f,
      );

      const updatedForm = {
        ...currentForm,
        formFields: updatedFormFields,
      };

      const isModified =
        JSON.stringify(updatedForm) !==
        JSON.stringify(state.originalForms[formId]);

      return {
        forms: { ...state.forms, [formId]: updatedForm },
        modifiedForms: isModified
          ? new Set([...Array.from(state.modifiedForms), formId])
          : new Set(
              Array.from(state.modifiedForms).filter((id) => id !== formId),
            ),
      };
    }),
}));
