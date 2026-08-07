'use client';

import { useEffect, useState } from 'react';

import {
  Body2,
  Body3,
  Button,
  DoubleButton,
  Flex,
  IconButton,
  Input,
  Modal,
  Title3,
} from '@dds/shared';
import { toast } from 'react-hot-toast';

import {
  useCreateCalendarCategory,
  useDeleteCalendarCategory,
  useUpdateCalendarCategory,
} from '@/_api/mutations/calendar';
import {
  calendarCategoryRequestSchema,
  type CalendarCategoryResponse,
} from '@/_api/types/calendar';

import { CalendarCategoryColorPicker } from './CalendarCategoryColorPicker';

const DEFAULT_CATEGORY_COLOR = '#3b82f6';

type CalendarCategoryModalProps = {
  readonly categories: readonly CalendarCategoryResponse[];
  readonly isOpen: boolean;
  readonly closeModal: () => void;
};

export function CalendarCategoryModal({
  categories,
  isOpen,
  closeModal,
}: CalendarCategoryModalProps) {
  const createCategory = useCreateCalendarCategory();
  const updateCategory = useUpdateCalendarCategory();
  const deleteCategory = useDeleteCalendarCategory();
  const [categoryName, setCategoryName] = useState('');
  const [color, setColor] = useState(DEFAULT_CATEGORY_COLOR);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
  const isPending =
    createCategory.isPending ||
    updateCategory.isPending ||
    deleteCategory.isPending;
  const categoryToDelete = categories.find(({ id }) => id === deleteCategoryId);

  useEffect(() => {
    if (deleteCategoryId !== null && categoryToDelete === undefined) {
      setDeleteCategoryId(null);
    }
  }, [categoryToDelete, deleteCategoryId]);

  function resetForm() {
    setCategoryName('');
    setColor(DEFAULT_CATEGORY_COLOR);
    setEditCategoryId(null);
  }

  function close() {
    resetForm();
    setDeleteCategoryId(null);
    closeModal();
  }

  function submitCategory() {
    const request = calendarCategoryRequestSchema.safeParse({
      categoryName,
      color,
    });

    if (!request.success) {
      toast.error(
        request.error.issues.at(0)?.message ??
          '카테고리 정보를 다시 확인해 주세요.',
      );
      return;
    }

    const mutationOptions = {
      onSuccess: () => {
        toast.success(
          editCategoryId === null
            ? '카테고리가 등록되었어요.'
            : '카테고리가 수정되었어요.',
        );
        resetForm();
      },
      onError: () => {
        toast.error('카테고리를 저장하지 못했어요.');
      },
    };

    if (editCategoryId === null) {
      createCategory.mutate(request.data, mutationOptions);
      return;
    }

    updateCategory.mutate(
      { categoryId: editCategoryId, request: request.data },
      mutationOptions,
    );
  }

  function startEdit(category: CalendarCategoryResponse) {
    setEditCategoryId(category.id);
    setCategoryName(category.name);
    setColor(category.color);
  }

  function confirmDelete(categoryId: number) {
    deleteCategory.mutate(categoryId, {
      onSuccess: () => {
        toast.success('카테고리가 삭제되었어요.');
        setDeleteCategoryId(null);
        if (editCategoryId === categoryId) resetForm();
      },
      onError: () => {
        toast.error('사용 중인 카테고리는 삭제할 수 없습니다.');
      },
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={close}
        closeOnOutsideClick={!isPending && deleteCategoryId === null}
      >
        <Flex
          dir="col"
          aria-hidden={deleteCategoryId !== null}
          inert={deleteCategoryId !== null}
          className="max-h-[85vh] w-[88vw] max-w-lg gap-5 overflow-y-auto"
        >
          <Title3 as="h2">카테고리 관리</Title3>

          <Flex dir="col" className="gap-3 rounded-xl bg-gray-50 p-4">
            <Body2 as="label" htmlFor="calendar-category-name">
              카테고리 이름
            </Body2>
            <Input
              id="calendar-category-name"
              value={categoryName}
              placeholder="카테고리 이름을 입력해 주세요."
              onChange={(event) => setCategoryName(event.target.value)}
              onClickReset={() => setCategoryName('')}
            />
            <Flex dir="col" className="gap-3">
              <Body2>카테고리 색상</Body2>
              <CalendarCategoryColorPicker color={color} onChange={setColor} />
            </Flex>
            <Flex justifyContent="end" className="gap-2">
              {editCategoryId !== null && (
                <Button variant="tertiary" size="sm" onClick={resetForm}>
                  취소
                </Button>
              )}
              <Button
                variant="primary"
                color="blue"
                size="sm"
                isLoading={createCategory.isPending || updateCategory.isPending}
                onClick={submitCategory}
              >
                {editCategoryId === null ? '등록' : '수정'}
              </Button>
            </Flex>
          </Flex>

          <Flex
            as="ul"
            dir="col"
            className="list-none divide-y divide-gray-200"
          >
            {categories.length === 0 && (
              <li className="py-8 text-center">
                <Body3 as="span" className="text-gray-400">
                  등록된 카테고리가 없습니다.
                </Body3>
              </li>
            )}
            {categories.map((category) => (
              <Flex
                as="li"
                key={category.id}
                alignItems="center"
                justifyContent="between"
                wrap="wrap"
                className="gap-3 py-3"
              >
                <Flex alignItems="center" className="min-w-0 gap-3">
                  <span
                    aria-hidden="true"
                    className="size-4 shrink-0 rounded-full border border-gray-200"
                    style={{ backgroundColor: category.color }}
                  />
                  <Body3 className="truncate text-gray-600">
                    {category.name}
                  </Body3>
                </Flex>

                <Flex className="gap-1">
                  <IconButton
                    aria-label={`${category.name} 수정`}
                    iconName="write"
                    color="gray"
                    size={18}
                    onClick={() => startEdit(category)}
                  />
                  <IconButton
                    aria-label={`${category.name} 삭제`}
                    iconName="trash"
                    color="gray"
                    size={18}
                    onClick={() => setDeleteCategoryId(category.id)}
                  />
                </Flex>
              </Flex>
            ))}
          </Flex>

          <Button
            variant="tertiary"
            size="full"
            disabled={isPending}
            onClick={close}
          >
            닫기
          </Button>
        </Flex>
      </Modal>
      <Modal
        isOpen={categoryToDelete !== undefined}
        closeModal={() => setDeleteCategoryId(null)}
        closeOnOutsideClick={!deleteCategory.isPending}
        contentClassName="rounded-2xl p-6 md:p-10"
      >
        <Flex
          dir="col"
          alignItems="center"
          className="w-[80vw] max-w-sm gap-6 text-center"
        >
          <Flex dir="col" className="gap-2">
            <Title3 as="h2">카테고리를 삭제하시겠습니까?</Title3>
            <Body3 className="text-gray-400">
              삭제 후엔 다시 복구할 수 없습니다.
            </Body3>
          </Flex>
          <DoubleButton
            left={
              <Button
                variant="tertiary"
                size="full"
                disabled={deleteCategory.isPending}
                onClick={() => setDeleteCategoryId(null)}
              >
                취소하기
              </Button>
            }
            right={
              <Button
                variant="primary"
                color="red"
                size="full"
                isLoading={deleteCategory.isPending}
                onClick={() => {
                  if (categoryToDelete) confirmDelete(categoryToDelete.id);
                }}
              >
                삭제하기
              </Button>
            }
          />
        </Flex>
      </Modal>
    </>
  );
}
