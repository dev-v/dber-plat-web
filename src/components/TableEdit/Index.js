import {Table, Input, message, Popconfirm} from 'antd';
import CellInput from './CellInput';

const msg = '同时只能编辑一行数据！';
const _idKey = '_dber_key_';
let i = 0;

class TableEdit extends React.Component {

  getColumnRender = (column) => {
    if (column.children) {
      column.children = column.children.map((child) => {
        return this.getColumnRender(child);
      });
      return column;
    } else {
      return {
        ...column,
        render: (text, record) => this.renderColumns(text,
          record, column.dataIndex || column.key),
      };
    }
  };

  constructor(props) {
    super(props);
    let {columns = [], operations = {}, selectedRowKeys} = props;
    const {saveEdit, del} = operations;
    del && (this.customDel = del);
    if (saveEdit) {
      this.saveEdit = saveEdit;
      columns = columns.map((column) => {
        if (column.editable == false) {
          return column;
        }
        return this.getColumnRender(column);
      });
    }
    const operationKeys = Object.keys(operations);
    if (operationKeys.length > 0) {
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            <div>
              {
                record.editable ? <span className='operation'>
                <a onClick={() => {this.save(record);}}>保存</a>
                <a onClick={() => this.cancel(record)}>取消</a>
                </span>
                  : <span className='operation'>
                      {
                        operationKeys.map((key) => {
                          if (key != 'saveEdit' && key != 'del') {
                            return <a key={key} onClick={() => {
                              operations[key](record);
                            }}>{key}</a>;
                          }
                        })
                      }
                    {saveEdit && <a onClick={() => this.edit(record)}>编辑</a>}
                    {del && <Popconfirm title="确定删除这条数据?"
                                        onConfirm={() => this.del(record)}
                                        okText="确定" cancelText="取消">
                      <a href="#">删除</a>
                    </Popconfirm>}
                    </span>
              }
            </div>
          );
        },
      });
    }
    let rowSelection;
    if (selectedRowKeys) {
      rowSelection = {
        selectedRowKeys,
        onChange: (keys) => {
          selectedRowKeys.length = 0;
          selectedRowKeys.push(...keys);
          this.setState({selectedRowKeys});
        },
      };
    }
    this.state = {
      rowSelection,
      ...{dataSource: [], deleteFlag: false}, ...this.props,
      columns,
    };
  }

  filterTarget(record) {
    const target = this.state.dataSource.filter(item => {
      return record == item;
    })[0];
    return target;
  }

  renderColumns(text, record, column) {
    return (
      <div>
        {record.editable
          ? <CellInput value={text} onChange={(val) => {
            record[column] = val;
          }}/>
          : text
        }
      </div>
    );
  }

  complete(record) {
    const target = this.filterTarget(record);
    if (target) {
      delete target.editable;
    }
    return target;
  }

  edit(record) {
    if (this.editRecord && this.editRecord != record) {
      message.warn(msg);
    } else {
      const target = this.filterTarget(record);
      if (target) {
        target.editable = true;
        this.setState({...this.state});
      }
    }
  }

  save(record) {
    const target = this.complete(record);
    if (target) {
      if (target[this.state.rowKey].toString().startsWith(_idKey)) {
        delete target[this.state.rowKey];
      }
      this.saveEdit && this.saveEdit(record);
      this.setState({...this.state});
    }
  }

  cancel(record) {
    const target = this.complete(record);
    if (target) {
      if (this.cacheEditRecord[this.state.rowKey] ==
        target[this.state.rowKey]) {
        for (let key in target) {
          delete target[key];
        }
        Object.assign(target, this.cacheEditRecord);
      }
      delete target.editable;
      this.setState({...this.state});
    }
  }

  del(record) {
    const newData = this.state.dataSource.filter(item => {
      return record != item;
    });
    this.delRecord = record;
    if (!record[this.state.rowKey].toString().startsWith(_idKey)) {
      this.customDel && (this.customDel(record));
    }
    this.state.deleteFlag = true;
    this.setState({...this.state, ...{dataSource: newData}});
  }

  render() {
    let editRecord, flag = false;
    this.editRecord = null;
    if (!this.state.deleteFlag) {
      this.state.dataSource = (this.props.dataSource ||
        this.state.dataSource).map(item => {
        if (item.editable) {
          if (flag) {
            delete item.editable;
            message.warn(msg);
          } else {
            editRecord = item;
            flag = true;
          }
        }
        if (!item[this.state.rowKey]) {
          item[this.state.rowKey] = _idKey + i++;
        }
        return item;
      });
    }
    if (flag) {
      this.editRecord = editRecord;
      this.cacheEditRecord = {...editRecord};
    }
    this.state.deleteFlag = false;
    return <Table {...this.state}/>;
  }
}

export default TableEdit;
