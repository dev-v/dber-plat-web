import {connect} from 'dva';
import RowContentRoute from './Content/RowContentRoute';
import CellHelp, {DictCategory} from '../components/TableEdit/CellHelp';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
  },
  {
    title: '健身类型',
    dataIndex: 'category',
    categoryId: DictCategory.fitnessType,
    editable: CellHelp.dictSelect,
  },
  {
    title: '项目名称',
    dataIndex: 'name',
  },
  {
    title: '是否支持场地共享',
    dataIndex: 'shareSite',
    categoryId: DictCategory.yesNo,
    editable: CellHelp.dictSelect,
  },
  {
    title: '是否支持团体课程',
    dataIndex: 'group',
    categoryId: DictCategory.yesNo,
    editable: CellHelp.dictSelect,
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
    editable: false,
  },];

class Fitness extends RowContentRoute {
  constructor(props) {
    super(props, 'fitness', columns);
  }

};

export default connect(({fitness}) => {
  return fitness;
})(Fitness);
