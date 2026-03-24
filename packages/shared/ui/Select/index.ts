import { Option } from './Option';
import { OptionGroupName } from './OptionGroupName';
import { OptionList } from './OptionList';
import { SelectButton } from './SelectButton';
import { SelectMain } from './SelectMain';

export const Select = Object.assign(SelectMain, {
  Option: Option,
  Button: SelectButton,
  List: OptionList,
});

export const GroupingSelect = Object.assign(SelectMain, {
  Option: Option,
  Select: SelectButton,
  List: OptionList,
  Group: OptionGroupName,
});
