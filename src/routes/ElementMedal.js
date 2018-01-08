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
    title: '元素名称',
    dataIndex: 'name',
  },
  {
    title: '化学式',
    dataIndex: 'chemical',
  },
  {
    title: '原子量',
    dataIndex: 'quality',
    editable:CellHelp.number,
  },
  {
    title: '活跃指数',
    dataIndex: 'activeLevel',
    categoryId: DictCategory.elementActive,
    editable: CellHelp.dictSelect,
  },
  {
    title: '元素分数',
    dataIndex: 'score',
    editable: false,
  },
  {
    title: '获取元素所需分数',
    dataIndex: 'needScore',
    editable: false,
  },
  {
    title: '描述',
    dataIndex: 'des',
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
    editable: false,
  },];

class ElementMedal extends RowContentRoute {
  constructor(props) {
    super(props, 'elementMedal', columns);
  }

};

export default connect(({elementMedal}) => {
  return elementMedal;
})(ElementMedal);
