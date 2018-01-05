import {connect} from 'dva';
import RowContentRoute from './Content/RowContentRoute';
import CellHelp from '../components/TableEdit/CellHelp';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
  },
  {
    title: '策略名称',
    dataIndex: 'name',
  },
  {
    title: '营业时间',
    children: [
      {
        title: '开始',
        dataIndex: 'beginTime',
        editable: CellHelp.time,
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        editable: CellHelp.time,
      },
    ],
  },
  {
    title: '订场保护时间（分）',
    children: [
      {
        title: '使用前',
        dataIndex: 'bookBeforeTime',
        editable: CellHelp.number,
      },
      {
        title: '使用后',
        dataIndex: 'bookAfterTime',
        editable: CellHelp.number,
      },
    ],
  },
  {
    title: '预约时长(分)',
    children: [
      {
        title: '最短时长',
        dataIndex: 'bookShortestTime',
        editable: CellHelp.number,
      },
      {
        title: '最大时长',
        dataIndex: 'bookLongestTime',
        editable: CellHelp.number,
      },
    ],
  },
  {
    title: '提前预约时间（分）',
    dataIndex: 'bookCurrentStartOffset',
    editable: CellHelp.number,
  },
  {
    title: '描述',
    dataIndex: 'content',
  },
  {
    title: '修改时间',
    dataIndex: 'modifyTime',
    editable: false,
  },
];

class Booking extends RowContentRoute {
  constructor(props) {
    super(props, 'booking', columns, {bordered: true});
  }
};

export default connect(({booking}) => {
  return booking;
})(Booking);
