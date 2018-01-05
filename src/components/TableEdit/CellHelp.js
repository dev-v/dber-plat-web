import {connect} from 'dva';
import CellDictSelect from './CellDictSelect';
import CellNumber from './CellNumber';
import CellTime from './CellTime';
import CellInput from './CellInput';

const CellType = {
  input: CellInput,
  time: CellTime,
  number: CellNumber,
  dictSelect: CellDictSelect,
};

const DictCategory = {
  fitnessType: 1029,
  yesNo: 1028,
};

export {CellType, DictCategory};

export default CellType;
