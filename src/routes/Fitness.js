import {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Row, Col} from 'antd';

class Fitness extends Component {

  componentWillMount() {
    this.props.dispatch({
      type: 'fitness/query',
      page: 1,
    });
  }

  rowSelection = (selectedRowKeys) => {
    return {
      selectedRowKeys,
      onChange: (keys) => {
        selectedRowKeys.length = 0;
        selectedRowKeys.push(...keys);
        this.setState({selectedRowKeys});
      },
    };
  };

  columns = [
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

  render() {
    const {selectedKeys, currentPage, total, datas} = this.props;

    const pagination = {
      total,
      pageSize: 20,
      currentPage,
      onChange: (page) => {
        this.props.dispatch({
          type: 'fitness/query',
          page,
        });
      },
    };
    return (
      <div>
        <Row style={{paddingBottom:'2px'}}>
          <Col span={12}>
            <Button type='primary'>新增</Button>
          </Col >
          <Col span={12}>
            <div style={{textAlign: 'right'}}>
              <Button type='primary'>查询</Button>
            </div>
          </Col>
        </Row>
        <Table rowKey={'id'} rowSelection={this.rowSelection(selectedKeys)}
               columns={this.columns}
               pagination={pagination}
               dataSource={datas}></Table>
      </div>);
  };
};

export default connect(({fitness}) => fitness)(Fitness);
