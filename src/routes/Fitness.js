import {PureComponent} from 'react';
import {connect} from 'dva';
import RowContent from '../components/Content/RowContent';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '健身类型',
    dataIndex: 'category',
  },
  {
    title: '项目名称',
    dataIndex: 'name',
  },
  {
    title: '是否支持场地共享',
    dataIndex: 'shareSite',
  },
  {
    title: '是否支持团体课程',
    dataIndex: 'group',
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
  },];

const modelName = 'fitness';

class Fitness extends PureComponent {

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

export default connect(({fitness}) => {
  return fitness;
})(Fitness);
