import {PureComponent} from 'react';
import {connect} from 'dva';
import RowContent from '../components/Content/RowContent';

const modelName = 'booking';

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
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
      },
    ],
  },
  {
    title: '订场保护时间',
    children: [
      {
        title: '使用前',
        dataIndex: 'bookBeforeTime',
      },
      {
        title: '使用后',
        dataIndex: 'bookAfterTime',
      },
    ],
  },
  {
    title: '预约时长',
    children: [
      {
        title: '最短时长',
        dataIndex: 'bookShortestTime',
      },
      {
        title: '最大时长',
        dataIndex: 'bookLongestTime',
      },
    ],
  },
  {
    title: '提前预约时间（分）',
    dataIndex: 'bookCurrentStartOffset',
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

class Booking extends PureComponent {

  query = (page) => {
    return this.props.dispatch({
      type: `${modelName}/query`,
      page: page,
    });
  };

  state = {
    datas: [],
  };

  render() {
    return (
      <RowContent
        bordered
        columns={columns}
        operations={{
          query: this.query,
          save: (record) => {
            return this.props.dispatch({
              type: `${modelName}/save`,
              data: record,
            });
          },
          del: (record) => {
            return this.props.dispatch({
              type: `${modelName}/del`,
              id: record.id,
            });
          },
        }}
      />);
  };
};

export default connect(({booking}) => {
  return booking;
})(Booking);
