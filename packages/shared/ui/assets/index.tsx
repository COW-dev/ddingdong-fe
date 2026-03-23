import ActivityReport from './activityReport.svg';
import Add from './add.svg';
import ArrowDown from './arrow-down.svg';
import ArrowLeft from './arrow-left.svg';
import ArrowRight from './arrow-right.svg';
import ArrowUp from './arrow-up.svg';
import Calendar from './calendar.svg';
import Camera from './camera.svg';
import Chart from './chart.svg';
import Check from './check.svg';
import CheckBold from './checkBold.svg';
import Cleaning from './cleaning.svg';
import Close from './close.svg';
import Comment from './comment.svg';
import Contacts from './contacts.svg';
import Cube from './cube.svg';
import Dots from './dots.svg';
import DownLoad from './download.svg';
import Drag from './drag.svg';
import Dustpan from './dustpan.svg';
import Error from './error.svg';
import Etc from './etc.svg';
import Eye from './eye.svg';
import Feed from './feed.svg';
import File from './file.svg';
import Heart from './heart.svg';
import Information from './information.svg';
import Like from './like.svg';
import Link from './link.svg';
import List from './list.svg';
import Loading from './loading.svg';
import Locate from './locate.svg';
import New from './new.svg';
import OpenBook from './openBook.svg';
import Peoples from './peoples.svg';
import Pin from './pin.svg';
import PlusMinus from './plusminus.svg';
import QuestionMark from './questionMark.svg';
import Refresh from './refresh.svg';
import Repair from './repair.svg';
import Report from './report.svg';
import Score from './score.svg';
import Search from './search.svg';
import Send from './send.svg';
import ShortReport from './shortReport.svg';
import Skip from './skip.svg';
import Spinner from './spinner.svg';
import Star from './star.svg';
import Trash from './trash.svg';
import Upload from './upload.svg';
import Video from './video.svg';
import Write from './write.svg';

export const Icons = {
  activityReport: ActivityReport,
  add: Add,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  calendar: Calendar,
  camera: Camera,
  chart: Chart,
  check: Check,
  checkBold: CheckBold,
  cleaning: Cleaning,
  close: Close,
  contacts: Contacts,
  comment: Comment,
  download: DownLoad,
  drag: Drag,
  dots: Dots,
  dustpan: Dustpan,
  error: Error,
  etc: Etc,
  eye: Eye,
  feed: Feed,
  file: File,
  heart: Heart,
  information: Information,
  like: Like,
  link: Link,
  list: List,
  loading: Loading,
  locate: Locate,
  cube: Cube,
  new: New,
  openBook: OpenBook,
  peoples: Peoples,
  pin: Pin,
  plusMinus: PlusMinus,
  questionMark: QuestionMark,
  refresh: Refresh,
  repair: Repair,
  report: Report,
  score: Score,
  search: Search,
  send: Send,
  shortReport: ShortReport,
  skip: Skip,
  spinner: Spinner,
  star: Star,
  trash: Trash,
  upload: Upload,
  video: Video,
  write: Write,
};

export type IconName = keyof typeof Icons;
export const iconNames = Object.keys(Icons) as IconName[];
