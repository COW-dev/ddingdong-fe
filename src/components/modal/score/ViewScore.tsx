import ScoreList from '@/components/score/ScoreList';
import { ScoreDetail } from '@/types/score';

type Prop = {
  scoreCategory: string;
  parseList: ScoreDetail[];
  closeModal: () => void;
};

export default function CreateScore({ parseList }: Prop) {
  return (
    <div>
      <ScoreList parseList={parseList} />
    </div>
  );
}
