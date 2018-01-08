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
    title: '年卡名称',
    dataIndex: 'name',
  },
  {
    title: '可使用天数',
    dataIndex: 'days',
    editable:CellHelp.number,
  },
  {
    title: '折扣天数（评估年卡购买价值）',
    dataIndex: 'discountDays',
    editable:CellHelp.number,
  },
  {
    title: '转让系统折扣（%）',
    dataIndex: 'transferSysDiscount',
    editable:CellHelp.number,
  },
  {
    title: '转让用户最大可设置折扣（%）',
    dataIndex: 'transferSelfDiscount',
    editable:CellHelp.number,
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
    editable: false,
  },];

class VipCardStrategy extends RowContentRoute {
  constructor(props) {
    super(props, 'vipCardStrategy', columns);
  }

};

export default connect(({vipCardStrategy}) => {
  return vipCardStrategy;
})(VipCardStrategy);
