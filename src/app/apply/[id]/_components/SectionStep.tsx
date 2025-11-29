'use client';

import { useRouter } from 'next/navigation';

import { Button, Flex } from 'ddingdong-design-system';
import { toast } from 'react-hot-toast';

import { useApplyFunnel } from '../_contexts/ApplyFunnelContext';

import { SelectSection } from './SelectSection';

type SectionStepProps = {
  selectableSections: string[];
  selectedSection: string;
  onSectionSelect: (section: string) => void;
};

export function SectionStep({
  selectableSections,
  selectedSection,
  onSectionSelect,
}: SectionStepProps) {
  const router = useRouter();
  const { setStep } = useApplyFunnel();
  const handleNext = () => {
    if (!selectedSection) {
      toast.error('지원 분야를 선택해주세요!');
      return;
    }
    setStep('QUESTION');
  };
  return (
    <Flex dir="col" alignItems="center" className="w-full">
      <SelectSection
        sections={selectableSections}
        selectedSection={selectedSection}
        onSectionSelect={onSectionSelect}
      />
      <Flex dir="row" gap={3} className="w-full justify-center py-10">
        <Button variant="tertiary" onClick={() => router.back()}>
          취소
        </Button>
        <Button variant="secondary" color="blue" onClick={handleNext}>
          다음
        </Button>
      </Flex>
    </Flex>
  );
}
