import {Component, PureComponent} from 'react';
import {connect} from 'dva';
import {Button, Row, Col, message} from 'antd';
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
  {title: 'ID', dataIndex: 'id', editable: false},
  {title: '代码（数字）', dataIndex: 'value'},
  {title: '枚举值（英文名称，建议大写）', dataIndex: 'enumName',},
  {title: '显示值', dataIndex: 'label',},
  {title: '描述', dataIndex: 'content'},
];

class Dict extends Component {

  pagination = {
    currentPage: 1,
    total: 0,
    onChange: (page) => {
      this.queryCategory(page);
    },
  };

  componentWillMount() {
    this.queryCategory(1);
  }

  queryCategory(page) {
    this.props.dispatch({
      type: `${modelName}/queryCategory`,
      page: page || this.pagination.currentPage,
    });
  }

  dictDatas = {};
  queryDict = (categoryId, fn) => {
    let datas;
    let flag = true;
    if (categoryId.toString().startsWith('_')) {
      datas = [];
      flag = false;
    } else {
      datas = this.dictDatas[categoryId];
    }
    if (!datas) {
      this.props.dispatch({
        type: `${modelName}/queryDict`,
        categoryId,
      }).then((payload) => {
        this.dictDatas[categoryId] = datas = payload;
        fn && fn(datas);
        this.setState({
          ...this.state,
        });
      });
    } else {
      fn && fn(datas);
      this.setState({
        ...this.state,
      });
    }
    return flag;
  };

  expandedRowRender = ({id: categoryId}) => {
    return (
      <TableEdit size='small'
                 rowKey='ids'
                 dataSource={this.dictDatas[categoryId]}
                 columns={dictColumns}
                 pagination={false}
                 operations={{
                   saveEdit: (record) => {
                     record.categoryId = categoryId;
                     this.props.dispatch({
                       type: `${modelName}/saveDict`,
                       dict: record,
                     }).then((data) => {
                       Object.assign(record, data);
                       this.queryDict(categoryId);
                     });
                   },
                   del: (record) => {
                     this.props.dispatch({
                       type: `${modelName}/delDict`,
                       id: record.id,
                     }).then(() => {
                       this.queryDict(categoryId, (datas) => {
                         datas.splice(datas.indexOf(record), 1);
                       });
                     });
                   },
                 }}
      />);
  };

  state = {
    datas: [],
    selectedRowKeys: [],
    expandedRowKeys: [],
  };

  addCategory = () => {
    this.state.datas.reverse().push({editable: true, sys: 'sys'});
    this.state.datas.reverse();
    this.setState({
      ...this.state,
    });
  };

  render() {
    Object.assign(this.state, this.props);

    Object.assign(this.pagination, {
      currentPgae: this.state.currentPage,
      total: this.state.total,
    });

    return (
      <div>
        <Row style={{paddingBottom: '2px'}}>
          <Col span={12}>
            <Button type='primary' onClick={() => {
              this.addCategory();
            }}>新增</Button>
          </Col>
          <Col span={12}>
            <div style={{textAlign: 'right'}}>
              <Button type='primary' onClick={() => {
                this.queryCategory();
              }}>查询</Button>
            </div>
          </Col>
        </Row>
        <TableEdit
          rowKey='id'
          pagination={this.pagination}
          dataSource={this.state.datas}
          selectedRowKeys={this.state.selectedRowKeys}
          columns={categoryColumns}
          operations={{
            saveEdit: (record) => {
              this.props.dispatch({
                type: `${modelName}/saveCategory`,
                category: record,
              }).then(() => {
                this.queryCategory();
              });
            },
            del: (record) => {
              this.props.dispatch({
                type: `${modelName}/delCategory`,
                id: record.id,
              }).then(() => {
                this.queryCategory();
              });
            },
            '添加字典': (record) => {
              if (this.queryDict(record.id, (datas) => {
                  datas.push({editable: true});
                })) {
                const ids = new Set(this.state.expandedRowKeys);
                ids.add(record.id);
                this.state.expandedRowKeys.length = 0;
                this.state.expandedRowKeys.push(...ids);
              } else {
                message.warn('请先添加字典类型！');
              }
            },
          }}
          onExpandedRowsChange={(rowKey) => {
            if (rowKey[rowKey.length - 1]) {
              this.queryDict(rowKey[rowKey.length - 1]);
            } else {
              this.setState({...this.state});
            }
          }}
          expandedRowKeys={this.state.expandedRowKeys}
          expandedRowRender={this.expandedRowRender}
        />
      </div>);
  };
};

export default connect(({dict}) => dict)(Dict);
