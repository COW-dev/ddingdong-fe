import { Body2, TabItem, Tabs } from 'ddingdong-design-system';

import { ClubDetail } from '@/app/_api/types/club';
import { FeedList } from '@/app/_api/types/feed';
import { ClubFeed } from '@/app/feeds/_components/ClubFeed';
import { FeedContainer } from '@/app/feeds/_containers/FeedContainer';

import { TabContainer } from '../_containers/TabContainer';

import { ClubIntroduce } from './ClubIntroduce';

type TabProps = {
  feedData: FeedList;
  clubData: ClubDetail;
};

export function ClubTabs({ feedData, clubData }: TabProps) {
  return (
    <TabContainer>
      <Tabs defaultIndex={0}>
        <TabItem label="동아리 소개">
          <ClubIntroduce
            introductionImage={clubData.introductionImage}
            introduction={clubData.introduction}
            activity={clubData.activity}
            ideal={clubData.ideal}
          />
        </TabItem>
        <TabItem label="활동 피드">
          {feedData.clubFeeds.length ? (
            <FeedContainer>
              <ClubFeed feeds={feedData.clubFeeds} />
            </FeedContainer>
          ) : (
            <Body2 className="py-20 text-center text-gray-500">
              아직 등록된 피드가 없어요.
            </Body2>
          )}
        </TabItem>
      </Tabs>
    </TabContainer>
  );
}
