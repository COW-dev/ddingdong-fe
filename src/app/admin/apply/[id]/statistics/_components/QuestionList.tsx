import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Question from '@/components/apply/ApplyQuestion';
import { useApplyStatistics } from '@/hooks/api/apply/useApplyStatistics';
import { ApplyQuestion } from '@/types/apply';
import StatisticsSections from '../../../../../../components/apply/StatisticsSections';

export default function QuestionList({ applyId }: { applyId: number }) {
  const [{ token }] = useCookies(['token']);
  const { data } = useApplyStatistics(applyId, token);
  const [fields, setFields] = useState<string>('공통');

  const [fieldsData, setFieldsData] = useState<ApplyQuestion[]>();

  useEffect(() => {
    const filteredData = data?.data.fieldStatistics.fields.filter(
      (item: ApplyQuestion) => item.section === fields,
    );
    setFieldsData(filteredData);
  }, [fields, data]);

  return (
    <>
      <StatisticsSections
        focusSection={fields}
        setFocusSection={setFields}
        sections={data?.data.fieldStatistics.sections ?? ['']}
        isClosed={true}
      />
      {fieldsData?.map((question: ApplyQuestion) => {
        return <Question data={question} key={question.id} />;
      })}
    </>
  );
}
