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
    title: '业务ID',
    dataIndex: 'bsId',
  },
  {
    title: '业务类型',
    dataIndex: 'type',
    render: (val) => {
      return <CellDictRender value={val} categoryId={DictCategory.imgType}/>;
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (val) => {
      return <CellDictRender value={val} categoryId={DictCategory.imgStatus}/>;
    },
  },
  {
    title: '路径',
    dataIndex: 'path',
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
  },];

class Img extends PureComponent {
  query = (page) => {
    return this.props.dispatch({
      type: `img/query`,
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

export default connect(({img}) => {
  return img;
})(Img);
