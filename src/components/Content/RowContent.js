import {PureComponent} from 'react';
import {Button, Row, Col} from 'antd';
import TableEdit from '../TableEdit/Index';

export default class RowContent extends PureComponent {
  constructor(props) {
    super(props);
    const {
      rowKey = 'id',
      columns = {}, operations = {
        save, del, query, get,
      }, addModel = {editable: true},
    } = props;
    const {save, del, query, get} = operations;
    if (!query) {
      throw new Error('必须提供operations.query(page,queryData)配置！');
    }

    const _ops = {};

    if (save) {
      _ops.saveEdit = (record) => {
        save(record).then((result) => {
          if (result) {
            this.query();
          }
        });
      };
    }

    if (del) {
      _ops.del = (record) => {
        del(record).then((result) => {
          if (result) {
            this.query();
          }
        });
      };
    }

    this._props = {
      ...props,
      columns,
      operations: _ops,
      addModel,
      rowKey,
      query,
      get,
    };
  }

  state = {
    currentPage: 1,
    total: 0,
    datas: [],
  };

  componentWillMount() {
    this.query(1);
  }

  add = () => {
    const datas = [...this.state.datas.reverse()];
    datas.push({...this._props.addModel});
    datas.reverse();
    this.setState({
      ...this.state,
      datas,
    });
  };

  query(page, data) {
    this._props.query(page || this.state.currentPage, data).
      then((data) => {
        if (data) {
          this.setState({...data});
        }
      });
  }

  render() {
    return (
      <div>
        <Row style={{paddingBottom: '2px'}}>
          <Col span={12}>
            <Button type='primary' onClick={() => {
              this.add();
            }}>新增</Button>
          </Col>
          <Col span={12}>
            <div style={{textAlign: 'right'}}>
              <Button type='primary' onClick={() => {
                this.query(1);
              }}>查询</Button>
            </div>
          </Col>
        </Row>
        <TableEdit
          pagination={{
            currentPage: this.state.currentPage,
            total: this.state.total,
            onChange: (page) => {
              this.query(page);
            },
          }}
          dataSource={this.state.datas}
          {...this._props}
        />
      </div>);
  };
};
