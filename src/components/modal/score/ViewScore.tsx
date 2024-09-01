import ScoreList from '@/components/score/ScoreList';
import { ScoreHistory } from '@/types/score';

type Prop = {
  history: ScoreHistory[];
};

export default function CreateScore({ history }: Prop) {
  return (
    <div>
      <ScoreList history={history} />
    </div>
  );
}
