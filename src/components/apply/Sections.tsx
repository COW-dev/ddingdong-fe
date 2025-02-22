import { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { SectionsProps } from '@/types/form';
import Prompt from '../common/Prompt';

export default function Sections({
  focusSection,
  setFocusSection,
  setFormField,
  sections,
  isClosed,
  formField,
  setSections,
  baseQuestion,
}: SectionsProps) {
  const [contextMenu, setContextMenu] = useState<{ section: string | null }>({
    section: null,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'rename' | 'add' | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleContextMenu = (e: React.MouseEvent, sectionName: string) => {
    e.preventDefault();
    if (sectionName === '공통') return;

    setContextMenu({ section: sectionName });
    setFocusSection(sectionName);
  };

  const handleClickOutside = () => {
    setContextMenu({ section: null });
  };

  const renameSection = (newName: string) => {
    if (!selectedSection) return;

    const trimmedName = newName.trim();
    if (sections.includes(trimmedName)) {
      toast.error('이미 존재하는 섹션입니다.');
      return;
    }

    setFormField(
      formField.map((section) =>
        section.section === selectedSection
          ? { ...section, section: trimmedName }
          : section,
      ),
    );

    setSections(
      sections.map((section) =>
        section === selectedSection ? trimmedName : section,
      ),
    );

    setModalVisible(false);
    setFocusSection(newName);
  };

  const deleteSection = (sectionName: string) => {
    const updatedFormField = formField.filter(
      (section) => section.section !== sectionName,
    );
    setFormField(updatedFormField);

    const updatedSections = sections.filter(
      (section) => section !== sectionName,
    );
    setSections(updatedSections);

    if (focusSection === sectionName && updatedSections.length > 0) {
      setFocusSection('공통');
    } else if (updatedSections.length === 0) {
      setFocusSection('');
    }
  };

  const addNewSection = (sectionName: string) => {
    const trimmedName = sectionName.trim();

    if (!trimmedName) {
      toast.error('섹션 이름을 입력해주세요.');
      return;
    }

    if (sections.includes(trimmedName)) {
      toast.error('이미 존재하는 섹션입니다.');
      return;
    }

    setSections([...sections, trimmedName]);

    setFormField((prev) => [
      ...prev,
      {
        section: trimmedName,
        questions: baseQuestion.map((q) => ({
          ...q,
          section: trimmedName,
        })),
      },
    ]);

    setFocusSection(trimmedName);
  };

  return (
    <TooltipProvider>
      <div
        onClick={handleClickOutside}
        className="relative flex items-center overflow-x-scroll md:overflow-visible"
      >
        <Prompt
          visible={modalVisible}
          closeModal={() => setModalVisible(false)}
          title={
            modalMode === 'rename'
              ? '변경할 이름을 입력해주세요.'
              : '새 섹션을 추가하세요'
          }
          placeholder="글자 수 최대 10자 이내"
          maxLength={10}
          confirmText={modalMode === 'rename' ? '변경하기' : '추가하기'}
          cancelText="취소"
          closeButton={false}
          onConfirm={modalMode === 'rename' ? renameSection : addNewSection}
        />

        <div className="relative flex items-center gap-1 border-b-0 px-2 text-lg font-semibold">
          {formField?.map((section, index) => (
            <div key={index} className="relative">
              <div
                className={`cursor-pointer rounded-md rounded-b-none border border-b-0 border-gray-200 px-3 py-1 ${
                  focusSection === section.section
                    ? 'bg-blue-50 text-blue-500'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setFocusSection(section.section)}
                onContextMenu={(e) => handleContextMenu(e, section.section)}
              >
                {section.section}
              </div>

              {contextMenu.section === section.section &&
                section.section !== '공통' && (
                  <ModifyButton
                    onRename={() => {
                      setSelectedSection(section.section);
                      setModalMode('rename');
                      setModalVisible(true);
                      setContextMenu({ section: null });
                    }}
                    onDelete={() => {
                      deleteSection(section.section);
                      setContextMenu({ section: null });
                    }}
                  />
                )}
            </div>
          ))}

          {sections.length < 6 && !isClosed && (
            <div
              onClick={() => {
                setModalMode('add');
                setModalVisible(true);
              }}
              className="cursor-pointer whitespace-nowrap rounded-md rounded-b-none border border-b-0 border-gray-200 bg-white px-3 py-1 font-semibold text-gray-600 hover:bg-gray-50"
            >
              + 추가하기
            </div>
          )}
        </div>

        {sections.length < 6 && !isClosed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="w-5 cursor-pointer text-gray-500" />
            </TooltipTrigger>
            <TooltipContent side="top" className="w-52 bg-blue-50">
              <p>분야별 질문이 다를 경우,</p>
              <p>시트를 추가하여 구분할 수 있습니다.</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}

export function ModifyButton({
  onRename,
  onDelete,
}: {
  onRename: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute left-0 top-full z-30 mt-1 flex w-fit flex-col gap-2 rounded-lg bg-white p-2 shadow-md">
      <button
        onClick={onRename}
        className="whitespace-nowrap rounded-lg px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
      >
        이름 변경하기
      </button>
      <button
        onClick={onDelete}
        className="rounded-lg px-4 py-2 text-left text-red-500 hover:bg-gray-100"
      >
        삭제하기
      </button>
    </div>
  );
}
