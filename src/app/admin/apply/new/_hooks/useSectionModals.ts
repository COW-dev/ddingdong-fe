import { useState } from 'react';

import { usePortal } from 'ddingdong-design-system';

export function useSectionModals() {
  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = usePortal();
  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = usePortal();
  const {
    isOpen: isAddOpen,
    openModal: openAddModal,
    closeModal: closeAddModal,
  } = usePortal();

  const [editingSection, setEditingSection] = useState<string>('');
  const [deletingSection, setDeletingSection] = useState<string>('');

  const handleEditSection = (section: string) => {
    setEditingSection(section);
    openEditModal();
  };

  const handleCloseEditSection = () => {
    closeEditModal();
    setEditingSection('');
  };

  const handleDeleteSection = (section: string) => {
    setDeletingSection(section);
    openDeleteModal();
  };

  const handleCloseDeleteSection = () => {
    closeDeleteModal();
    setDeletingSection('');
  };

  const handleOpenAddSection = () => {
    openAddModal();
  };

  const handleCloseAddSection = () => {
    closeAddModal();
  };

  const clearEditingSection = () => {
    setEditingSection('');
  };

  const clearDeletingSection = () => {
    setDeletingSection('');
  };

  return {
    // Edit Modal
    isEditOpen,
    editingSection,
    handleEditSection,
    handleCloseEditSection,
    clearEditingSection,
    // Delete Modal
    isDeleteOpen,
    deletingSection,
    handleDeleteSection,
    handleCloseDeleteSection,
    clearDeletingSection,
    // Add Modal
    isAddOpen,
    handleOpenAddSection,
    handleCloseAddSection,
  };
}
