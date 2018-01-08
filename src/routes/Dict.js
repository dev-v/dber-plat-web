import {Component, PureComponent} from 'react';
import {connect} from 'dva';
import {Button, Row, Col, message} from 'antd';
import RowContent from '../components/Content/RowContent';
import RowContentRoute from './Content/RowContentRoute';

const modelName = 'dict';

const categoryColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    editable: false,
  },
  {
    title: '代码',
    dataIndex: 'code',
  },
  {
    title: '字典类型',
    dataIndex: 'category',
  },
  {
    title: '所属系统',
    editable: false,
    dataIndex: 'sys',
  },
  {
    title: '描述',
    dataIndex: 'content',
    width: '460px',
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

class Dict extends RowContentRoute {

  constructor(props) {
    super(props, 'dict', categoryColumns);
  }

  /**
   * 如果categoryId合法且为真实id 返回true，临时id或undefined 返回false
   * @param categoryId
   * @param fn
   * @returns {boolean}
   */
  queryDict = (categoryId, fn) => {
    let datas;
    let flag = true;
    if (!categoryId || categoryId.toString().startsWith('_')) {
      datas = [];
      flag = false;
    } else {
      datas = this.state.dictDatas[categoryId];
    }
    if (!datas) {
      this.props.dispatch({
        type: `${modelName}/queryWithoutPageDict`,
        condition: {categoryId},
      }).then((payload) => {
        this.state.dictDatas[categoryId] = datas = payload;
        fn && fn(datas);
        this.setState({
          ...this.state,
          dictDatas: {...this.state.dictDatas},
        });
      });
    } else {
      fn && fn(datas);
      this.setState({
        ...this.state,
        dictDatas: {...this.state.dictDatas},
      });
    }
    return flag;
  };

  addDict = ({id: categoryId}) => {
    if (!this.queryDict(categoryId, (datas) => {
        datas.push({editable: true, categoryId});
        const ids = new Set(this.state.expandedRowKeys);
        ids.add(categoryId);
        this.state.expandedRowKeys.length = 0;
        this.state.expandedRowKeys.push(...ids);
      })) {
      message.warn('请先添加字典类型！');
    }
  };

  editDict = (record) => {
    return this.props.dispatch({
      type: `${modelName}/saveDict`,
      data: record,
    }).then((data) => {
      Object.assign(record, data);
      this.queryDict(record.categoryId);
    });
  };

  delEdit = (record) => {
    return this.props.dispatch({
      type: `${modelName}/delDict`,
      id: record.id,
    }).then(() => {
      this.queryDict(record.categoryId, (datas) => {
        datas.splice(datas.indexOf(record), 1);
      });
    });
  };

  state = {
    expandedRowKeys: [],
    dictDatas: {},
  };

  render() {
    return (
      <RowContent
        addModel={{editable: true, sys: 'sys'}}
        columns={this.columns}
        edit={this.save}
        del={this.del}
        query={this.query}
        operations={[
          {
            text: '添加字典',
            onClick: this.addDict,
          }]}
        onExpandedRowsChange={(rowKey) => {
          this.queryDict(rowKey[rowKey.length - 1]);
        }}
        expandedRowKeys={this.state.expandedRowKeys}
        expandedRowRender={this.expandedRowRender}
        expandedRowRender={({id: categoryId}) => {
          return (
            <RowContent
              bordered={true}
              columns={dictColumns}
              datas={this.state.dictDatas[categoryId]}
              pagination={false}
              edit={{
                toolbar: false,
                operate: this.editDict,
              }}
              del={this.delEdit}
            />);
        }}
      />);
  }
};

export default connect(({dict}) => dict)(Dict);
