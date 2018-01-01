import {Table, Input, message} from 'antd';
import InputEdit from './InputEdit';

const msg = '同时只能编辑一行数据！';
const _idKey = '_dber_key_';
let i = 0;

class TableEdit extends React.Component {
  rowKey;

  constructor(props) {
    super(props);
    let {columns = [], operations = {}} = props;
    const {saveEdit, del} = operations;
    del && (this.customDel = del);
    if (saveEdit) {
      this.saveEdit = saveEdit;
      columns = columns.map((column) => {
        if (column.editable == false) {
          return column;
        }
        return {
          ...column,
          render: (text, record) => this.renderColumns(text,
            record, column.dataIndex || column.key),
        };
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
                            return <a onClick={() => {
                              operations[key](record);
                            }}>key</a>;
                          }
                        })
                      }
                    {saveEdit && <a onClick={() => this.edit(record)}>编辑</a>}
                    {del && <a onClick={() => this.del(record)}>删除</a>}
                    </span>
              }
            </div>
          );
        },
      });
    }

    this.state = {
      ...{dataSource: [], deleteFlag: false}, ...this.props,
      columns,
    };
    this.rowKey = this.state.rowKey;
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
          ? <InputEdit value={text} onChange={(val) => {
            record[column] = val;
          }}/>
          : text
        }
      </div>
    );
  }

  complete(record) {
    this.editRecord = null;
    const target = this.filterTarget(record);
    if (target) {
      delete target.editable;
    }
    return target;
  }

  editRecord;

  edit(record) {
    if (this.editRecord && this.editRecord != record) {
      message.warn(msg);
    } else {
      this.editRecord = record;
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
      if (target[this.rowKey].toString().startsWith(_idKey)) {
        delete target[this.rowKey];
      }
      this.saveEdit && this.saveEdit(record);
      this.setState({...this.state});
    }
  }

  cancel(record) {
    const target = this.complete(record);
    if (target) {
      Object.assign(target, this.cacheData.filter(
        item => record[this.rowKey] === item[this.rowKey])[0]);
      delete target.editable;
      this.setState({...this.state});
    }
  }

  del(record) {
    const newData = this.state.dataSource.filter(item => {
      return record != item;
    });
    this.delRecord = record;
    this.customDel && (this.customDel(record));
    this.state.deleteFlag = true;
    this.setState({...this.state, ...{dataSource: newData}});
  }

  render() {
    let flag = false;
    this.cacheData = [];
    if (!this.state.deleteFlag) {
      this.state.dataSource = (this.props.dataSource ||
        this.state.dataSource).map(item => {
        if (item.editable) {
          if (flag) {
            delete item.editable;
            message.warn(msg);
          } else {
            this.editRecord = item;
            flag = true;
          }
        }
        if (!item[this.rowKey]) {
          item[this.rowKey] = _idKey + i++;
        }
        this.cacheData.push({...item});
        return item;
      });
    }
    this.state.deleteFlag = false;
    return <Table {...this.state}/>;
  }
}

export default TableEdit;
