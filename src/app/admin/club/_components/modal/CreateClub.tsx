'use client';

import { Body1, Button, Flex } from 'ddingdong-design-system';
import toast from 'react-hot-toast';

import { useAddClub } from '@/app/_api/mutations/club';
import { LabeledInput } from '@/app/admin/club/_components/form/LabeledInput';
import { LabeledSelect } from '@/app/admin/club/_components/form/LabeledSelect';
import {
  INPUT_FIELDS,
  CATEGORY_OPTIONS,
} from '@/app/admin/club/_constant/Inputs';
import { useObjectForm } from '@/hooks/common/useObjectForm';

import ModalHeader from './ModalHeader';

type CreateClubProp = { closeModal: () => void };

type ClubForm = {
  clubName: string;
  category: string;
  tag: string;
  leaderName: string;
  authId: string;
  password: string;
};

const INIT: ClubForm = {
  clubName: '',
  category: CATEGORY_OPTIONS[0] ?? '카테고리',
  tag: '',
  leaderName: '',
  authId: '',
  password: '',
};

export default function CreateClub({ closeModal }: CreateClubProp) {
  const { mutate, isPending } = useAddClub();
  const form = useObjectForm<ClubForm>(INIT);

  const handleSubmit = () => {
    const payload = { ...form.values };
    mutate(payload, {
      onSuccess: () => {
        toast.success('동아리가 추가되었어요!');
        form.reset();
        closeModal();
      },
      onError: (err) => {
        const msg =
          err instanceof Error && err.message
            ? err.message
            : '동아리 추가에 실패했어요.';
        toast.error(msg);
      },
    });
  };

  const getField = (name: keyof ClubForm) =>
    INPUT_FIELDS.find((f) => f.name === name)!;

  return (
    <form
      className="max-h-[70vh] w-auto max-w-[60vh] overflow-y-auto px-1"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      noValidate
    >
      <ModalHeader
        titleNode={<Body1>동아리 생성하기</Body1>}
        onClose={closeModal}
      />

      <Flex dir="col" className="w-full">
        <LabeledInput
          field={getField('clubName')}
          {...form.register('clubName')}
          className="mb-4"
        />
        <LabeledInput
          field={getField('leaderName')}
          {...form.register('leaderName')}
          className="mb-4"
        />
      </Flex>

      <Flex dir="col" className="mb-2 w-full items-center gap-2 md:flex-row">
        <LabeledSelect
          id="category"
          label="카테고리"
          value={form.values.category}
          onChange={form.register('category').onChange}
          options={CATEGORY_OPTIONS}
        />
        <LabeledInput
          field={getField('tag')}
          {...form.register('tag')}
          className="w-full"
        />
      </Flex>

      <Flex dir="col" className="w-full">
        <LabeledInput
          field={getField('authId')}
          {...form.register('authId')}
          className="mb-4"
        />
        <LabeledInput
          field={getField('password')}
          {...form.register('password')}
          className="mb-4"
        />
      </Flex>

      <Button
        type="submit"
        disabled={isPending}
        variant="primary"
        color="blue"
        size="full"
        data-role="submit"
      >
        동아리 생성하기
      </Button>
    </form>
  );
}
