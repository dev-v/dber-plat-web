import {connect} from 'dva';
import {PureComponent} from 'react';
import RowContent from '../components/Content/RowContent';
import CellHelp, {DictCategory} from '../components/TableEdit/CellHelp';
import CellDictRender from '../components/TableEdit/CellDictRender';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '类型',
    dataIndex: 'type',
    render: (val) => {
      return <CellDictRender value={val} categoryId={DictCategory.msgType}/>;
    },
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
  },];

class Msg extends PureComponent {
  query = (page) => {
    return this.props.dispatch({
      type: `msg/query`,
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

export default connect(({msg}) => {
  return msg;
})(Msg);
