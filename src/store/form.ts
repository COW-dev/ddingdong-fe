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
  deleteField: (formId: string, clientId: string) => void;
  updateField: (
    formId: string,
    clientId: string,
    field: Partial<FormField>,
  ) => void;
}

const generateClientId = (index?: number) =>
  `client_${Date.now()}${index !== undefined ? `_${index}` : ''}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

const updateFormState = (
  state: FormStore,
  formId: string,
  updatedForm: FormState,
) => {
  const isModified =
    JSON.stringify(updatedForm) !== JSON.stringify(state.originalForms[formId]);
  return {
    forms: { ...state.forms, [formId]: updatedForm },
    modifiedForms: isModified
      ? new Set(Array.from(state.modifiedForms).concat(formId))
      : new Set(Array.from(state.modifiedForms).filter((id) => id !== formId)),
  };
};

const removeFormState = (state: FormStore, formId: string) => {
  const { [formId]: _, ...forms } = state.forms;
  const { [formId]: __, ...originalForms } = state.originalForms;
  const { [formId]: ___, ...mode } = state.mode;
  const { [formId]: ____, ...focusSection } = state.focusSection;

  return {
    forms,
    originalForms,
    mode,
    focusSection,
    modifiedForms: new Set(
      Array.from(state.modifiedForms).filter((id) => id !== formId),
    ),
  };
};

export const useFormStore = create<FormStore>((set, get) => ({
  forms: {},
  originalForms: {},
  modifiedForms: new Set(),
  mode: {},
  focusSection: {},

  setServerForm: (formId, formState) =>
    set((state) => {
      const processedFormState = {
        ...formState,
        formFields: formState.formFields.map((field, index) => ({
          ...field,
          clientId: field.clientId || generateClientId(index),
        })),
      };
      return {
        forms: { ...state.forms, [formId]: processedFormState },
        originalForms: { ...state.originalForms, [formId]: processedFormState },
        modifiedForms: new Set(
          Array.from(state.modifiedForms).filter((id) => id !== formId),
        ),
        mode: { ...state.mode, [formId]: 'view' },
        focusSection: { ...state.focusSection, [formId]: '공통' },
      };
    }),

  getForm: (formId) => get().forms[formId],

  updateFormField: (formId, field, value) =>
    set((state) => {
      const currentForm = state.forms[formId];
      if (!currentForm) return state;
      const updatedForm = { ...currentForm, [field]: value };
      return updateFormState(state, formId, updatedForm);
    }),

  isModified: (formId) => get().modifiedForms.has(formId),

  resetToOriginal: (formId) =>
    set((state) => {
      const originalForm = state.originalForms[formId];
      if (!originalForm) return state;
      return updateFormState(state, formId, originalForm);
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

    const initialFormState: FormState = {
      title: '',
      description: '',
      hasInterview: false,
      sections: ['공통'],
      startDate: null,
      endDate: null,
      formFields: [],
    };

    set((state) => ({
      forms: { ...state.forms, [tempId]: initialFormState },
      originalForms: { ...state.originalForms, [tempId]: initialFormState },
      modifiedForms: new Set(Array.from(state.modifiedForms).concat(tempId)),
      mode: { ...state.mode, [tempId]: 'edit' },
      focusSection: { ...state.focusSection, [tempId]: '공통' },
    }));
    return tempId;
  },

  updateFormId: (oldId, newId) =>
    set((state) => {
      if (!state.forms[oldId]) return state;
      const updated = removeFormState(state, oldId);
      const newKey = newId.toString();
      return {
        ...updated,
        forms: { ...updated.forms, [newKey]: state.forms[oldId] },
        originalForms: {
          ...updated.originalForms,
          [newKey]: state.originalForms[oldId],
        },
        mode: { ...updated.mode, [newKey]: state.mode[oldId] },
        focusSection: {
          ...updated.focusSection,
          [newKey]: state.focusSection[oldId],
        },
      };
    }),

  removeForm: (formId) => set((state) => removeFormState(state, formId)),

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
        clientId: field.clientId || generateClientId(),
        order: currentForm.formFields.length + 1,
      };
      const updatedForm = {
        ...currentForm,
        formFields: [...currentForm.formFields, newField],
      };
      return updateFormState(state, formId, updatedForm);
    }),

  deleteField: (formId, clientId) =>
    set((state) => {
      const currentForm = state.forms[formId];
      if (!currentForm) return state;
      const updatedForm = {
        ...currentForm,
        formFields: currentForm.formFields.filter(
          (f) => f.clientId !== clientId,
        ),
      };
      return updateFormState(state, formId, updatedForm);
    }),

  updateField: (formId, clientId, field) =>
    set((state) => {
      const currentForm = state.forms[formId];
      if (!currentForm) return state;
      const updatedForm = {
        ...currentForm,
        formFields: currentForm.formFields.map((f) =>
          f.clientId === clientId ? { ...f, ...field } : f,
        ),
      };
      return updateFormState(state, formId, updatedForm);
    }),
}));
