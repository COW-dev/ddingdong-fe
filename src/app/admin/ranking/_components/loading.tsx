import { Flex } from 'ddingdong-design-system';

import { Loading } from '@/components/loading/Loading';

export default function RankingLoading() {
  return (
    <Flex className="w-full justify-center py-[3.2rem] md:py-[4.8rem]">
      <Loading />
    </Flex>
  );
}
