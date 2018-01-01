import {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Row, Col} from 'antd';
import EditCategory from './EditCategory';
import TableEdit from '../../components/TableEdit/Index';

const modelName = 'dict';

const categoryColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
  },
  {
    title: '字典类型',
    dataIndex: 'category',
  },
  {
    title: '所属系统',
    dataIndex: 'sys',
  },
  {
    title: '描述',
    dataIndex: 'content',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    editable: false,
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
    editable: false,
  },];

const dictColumns = [
  {title: 'ID', dataIndex: 'id'},
  {title: '显示值', dataIndex: 'name',},
  {title: '代码（数字）', dataIndex: 'value'},
  {title: '描述', dataIndex: 'content'},
];

class Dict extends Component {

  componentWillMount() {
    this.queryCategory(1);
  }

  queryCategory(page) {
    this.props.dispatch({
      type: `${modelName}/queryCategory`,
      page,
    });
  }

  editCategory(data = {}) {
    this.props.dispatch({
      type: `${modelName}/editCategory`,
      data,
    });
  }

  expandedRowRender() {
    return (
      <Table
        columns={dictColumns}
        pagination={false}
      />
    );
  };

  rowSelection(selectedRowKeys) {
    return {
      selectedRowKeys,
      onChange: (keys) => {
        selectedRowKeys.length = 0;
        selectedRowKeys.push(...keys);
        this.setState({selectedRowKeys});
      },
    };
  };

  render() {
    const {selectedKeys, datas} = this.props;

    const pagination = {
      ...this.props,
      onChange: (page) => {
        this.queryCategory(page);
      },
    };

    return (
      <div>
        <Row style={{paddingBottom: '2px'}}>
          <Col span={12}>
            <Button type='primary' onClick={() => {
              this.props.dispatch({
                type: `${modelName}/addCategory`,
              });
              // this.editCategory();
            }}>新增</Button>
          </Col>
          <Col span={12}>
            <div style={{textAlign: 'right'}}>
              <Button type='primary'>查询</Button>
            </div>
          </Col>
        </Row>
        <EditCategory/>
        {/*  <Table rowKey={'id'} rowSelection={this.rowSelection(selectedKeys)}
               columns={categoryColumns}
               expandRowRender={this.expandedRowRender} pagination={pagination}
               dataSource={datas}/>*/}
        <TableEdit rowKey={'id'} rowSelection={this.rowSelection(selectedKeys)}
                   columns={categoryColumns}
                   operations={{
                     saveEdit(record) {
                       console.log(record);
                     },
                     del(record) {
                       console.log('del', record);
                     },
                   }}
                   expandRowRender={this.expandedRowRender}
                   pagination={pagination}
                   dataSource={datas}/>
      </div>);
  };
};

export default connect(({dict}) => dict.index)(Dict);
