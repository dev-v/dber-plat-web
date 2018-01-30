import {connect} from 'dva';
import {PureComponent} from 'react';
import RowContent from '../components/Content/RowContent';
import {DictCategory} from '../components/TableEdit/CellHelp';
import CellDictRender from '../components/TableEdit/CellDictRender';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '电话',
    dataIndex: 'cellphone',
  },
  {
    title: '被绑定账户ID',
    dataIndex: 'bindId',
  },
  {
    title: '密码失效',
    dataIndex: 'pwExpired',
  },
  {
    title: '账户类型',
    dataIndex: 'type',
    render: (val) => {
      return <CellDictRender value={val}
                             categoryId={DictCategory.accountType}/>;
    },
  },
  {
    title: '账户状态',
    dataIndex: 'status',
    render: (val) => {
      return <CellDictRender value={val}
                             categoryId={DictCategory.accountStatus}/>;
    },
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
  },];

class Account extends PureComponent {
  query = (page) => {
    return this.props.dispatch({
      type: `account/query`,
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

export default connect(({account}) => {
  return account;
})(Account);
