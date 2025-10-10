import { Fragment } from 'react';

import {
  Body2,
  Button,
  DoubleButton,
  Flex,
  GroupingSelect,
  Input,
  Modal,
  Title3,
} from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { useAddMember } from '@/app/_api/mutations/member';
import { departmentInfo } from '@/constants/department';
import { Position } from '@/constants/position';

import { useAddClubMember } from '../_hooks/useAddClubMember';

type AddModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddModal({ isOpen, onClose }: AddModalProps) {
  const { mutate: addMember } = useAddMember();
  const {
    memberInfo,
    resetMemberInfo,
    handleMemberInfoChange,
    handleMemberInfoSelect,
    handleResetMemberInfo,
  } = useAddClubMember();

  const handleSaveMember = () => {
    if (!memberInfo) return;

    if (
      !memberInfo.name ||
      !memberInfo.studentNumber ||
      !memberInfo.department ||
      !memberInfo.phoneNumber
    ) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    addMember(
      { member: memberInfo },
      {
        onSuccess: () => {
          onClose();
          resetMemberInfo();
          toast.success('동아리원이 추가되었어요!');
        },
        onError: () => {
          toast.error('동아리원 추가에 실패했어요.');
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <Flex dir="col" gap={4} className="w-[80vw] md:w-[480px]">
        <Title3>동아리원 명단 추가</Title3>
        <div className="h-[1.5px] bg-gray-200" />
        <Flex dir="col" gap={2}>
          <Body2 as="label" htmlFor="name">
            이름
          </Body2>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요."
            value={memberInfo?.name}
            onChange={handleMemberInfoChange}
            onClickReset={() => handleResetMemberInfo('name')}
          />
        </Flex>
        <Flex dir="col" gap={2}>
          <Body2 as="label" htmlFor="studentNumber">
            학번
          </Body2>
          <Input
            id="studentNumber"
            name="studentNumber"
            placeholder="학번을 입력해주세요."
            value={memberInfo?.studentNumber}
            onChange={handleMemberInfoChange}
            onClickReset={() => handleResetMemberInfo('studentNumber')}
          />
        </Flex>
        <Flex dir="col" gap={2} className="w-full">
          <Body2 as="label" htmlFor="department">
            학과
          </Body2>
          <GroupingSelect
            size="lg"
            value={memberInfo?.department}
            onChange={(option: string) =>
              handleMemberInfoSelect('department', option)
            }
            defaultValue="학과를 선택해주세요."
          >
            {Object.entries(departmentInfo).map(([group, departments]) => (
              <Fragment key={group}>
                <GroupingSelect.Group name={group} />
                {departments.map((dept, idx) => (
                  <GroupingSelect.Option key={`${group}-${idx}`} name={dept} />
                ))}
              </Fragment>
            ))}
          </GroupingSelect>
        </Flex>

        <Flex dir="col" gap={2}>
          <Body2 as="label" htmlFor="phoneNumber">
            {`전화번호 ('-'포함)`}
          </Body2>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="전화번호를 입력해주세요."
            value={memberInfo?.phoneNumber}
            onChange={handleMemberInfoChange}
            onClickReset={() => handleResetMemberInfo('phoneNumber')}
          />
        </Flex>
        <Flex dir="col" gap={2}>
          <Body2 as="label" htmlFor="position">
            직급
          </Body2>
          <Flex gap={3}>
            {Object.entries(Position).map(([key, value]) => (
              <Chip
                key={key}
                isSelected={memberInfo?.position === value}
                onClick={() => handleMemberInfoSelect('position', value)}
              >
                {key}
              </Chip>
            ))}
          </Flex>
        </Flex>
        <DoubleButton
          left={
            <Button
              variant="tertiary"
              size="full"
              onClick={() => {
                onClose();
                resetMemberInfo();
              }}
            >
              <Body2>닫기</Body2>
            </Button>
          }
          right={
            <Button
              variant="primary"
              color="blue"
              size="full"
              onClick={handleSaveMember}
            >
              <Body2 weight="semibold">추가하기</Body2>
            </Button>
          }
        />
      </Flex>
    </Modal>
  );
}

function Chip({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean;
  onClick: VoidFunction;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`cursor-pointer rounded-xl border-[1px] px-4 py-1 text-sm font-semibold ${
        isSelected
          ? 'border-blue-200 bg-blue-100 text-blue-600'
          : 'border-gray-200 bg-white text-gray-300 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
