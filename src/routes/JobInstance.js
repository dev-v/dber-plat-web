import {connect} from 'dva';
import {PureComponent} from 'react';
import RowContent from '../components/Content/RowContent';
import {DictCategory} from '../components/TableEdit/CellHelp';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '所属JOB',
    dataIndex: 'jobId',
  },
  {
    title: '内置参数',
    dataIndex: 'params',
  },
  {
    title: '用户参数',
    dataIndex: 'customParams',
  },
  {
    title: '执行参数',
    dataIndex: 'realParams',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (val) => {
      return <CellDictRender value={val}
                             categoryId={DictCategory.jobExecuteStatus}/>;
    },
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
  },];

class JobInstance extends PureComponent {
  query = (page) => {
    return this.props.dispatch({
      type: `jobInstance/query`,
      page: page,
    });
  };

  render() {
    return (
      <RowContent
        query={this.query}
        columns={columns}
      />);
  };

};

export default connect(({jobInstance}) => {
  return jobInstance;
})(JobInstance);
