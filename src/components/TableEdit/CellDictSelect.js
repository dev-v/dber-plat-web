import {Select} from 'antd';
import {PureComponent} from 'react';
import {dictCache} from '../../utils/util';

export default class CellDictSelect extends PureComponent {

  /**
   * 用categoryId作为key缓存的数据
   * @type {{}}
   */
  static format = (value, column) => {
    dictCache.getDict(column.categoryId, (dict) => {
      value = dict[value];
    });
    return value;
  };

  state = {
    value: undefined,
  };

  constructor(props) {
    super(props);
    Object.assign(this.state, props);
    this.state.value = CellDictSelect.format(props.value, props);
    this.setOptions();
  }

  setValue(value) {
    this.setState({value});
    this.state.onChange(value);
  }

  setOptions() {
    dictCache.getDict(this.props.categoryId, (dict, remote) => {
      const opts = [];
      for (let val in dict) {
        opts.push(<Select.Option key={val}
                                 value={val}>{dict[val]}</Select.Option>);
        if (!this.state.value) {
          this.state.value = val;
        }
      }
      this.state.options = opts;
      if (remote) {
        this.setState({
          ...this.state,
        });
      }
    });
  }

  render() {
    return (
      <Select style={{minWidth: 100}} {...this.state} onChange={(val) => {
        this.setValue(val);
      }}>
        {this.state.options}
      </Select>);
  }
};
